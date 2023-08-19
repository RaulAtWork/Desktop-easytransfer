use std::{fs, path};
use std::cell::RefCell;
use std::io::{BufWriter, Read, Write};
use std::net::{TcpStream, ToSocketAddrs};
use std::ops::Deref;
use once_cell::unsync::Lazy;
#[cfg(target_os = "windows")]
use std::os::windows::prelude::MetadataExt;

#[cfg(target_os = "linux")]
use std::os::unix::fs::MetadataExt;
use std::path::PathBuf;
use std::rc::Rc;
use std::string::ToString;
use std::sync::{Arc, Mutex};
use std::thread::sleep;
use std::time::Duration;
use tauri::api;
use tauri::api::dialog::FileDialogBuilder;

use easytransfer_gui::TO_MEGABYTES;

// #[tauri::command]
#[tauri::command(rename_all = "snake_case")]
pub async fn send_files(ip: String, files: Vec<String>, port: usize, chunkSize: usize) {
    let chunk_size = chunkSize * TO_MEGABYTES;
    println!("Sending file...");
    println!("{:?}", files);
    let mut file = fs::File::open(files.get(0).unwrap()).unwrap();
    let metadata = file.metadata().unwrap();

    let file_name = path::Path::new(files.get(0).unwrap()).file_name().unwrap().to_str().unwrap().to_string();

    #[cfg(target_os = "linux")]
        let file_size = metadata.size() as usize;
    #[cfg(target_os = "windows")]
        let file_size = metadata.file_size() as usize;

    let name_size = file_name.len();

    println!("{:?}", file_name);
    println!("{:?}", file_size);
    println!("{:?}", name_size);

    let mut stream = TcpStream::connect(format!("{ip}:{port}")).unwrap();
    let mut stream_cpy_for_reading = stream.try_clone().unwrap();
    let mut buf_writer = BufWriter::new(&mut stream);


    let _ = buf_writer.write_all(&file_size.to_le_bytes());
    let _ = buf_writer.write_all(&name_size.to_le_bytes());
    let _ = buf_writer.write_all(file_name.as_bytes());
    buf_writer.flush();

    let mut file_contents: Vec<u8> = vec![0; chunk_size];


    let mut total_written = 0;
    while total_written < file_size {
        println!("Total written: {}", total_written);
        let mut nread = 0;
        while nread < chunk_size {
            println!("Reading from file...");
            nread += file.read(&mut file_contents[nread..]).unwrap();
            if total_written + nread == file_size || nread == 0 {
                println!("OJO!");
                break;
            }
        }
        println! {"Read N: {}", nread};
        let _ = buf_writer.write_all(&file_contents[..nread]);
        total_written += nread;
    }
    buf_writer.flush();
    println!("Waiting for ack!");
    let mut ack = [0u8; 1];
    let _ = stream_cpy_for_reading.read_exact(&mut ack);
    let ack = std::str::from_utf8(&ack).unwrap();
    println!("{}", ack);

    println!("DONE!");
}

#[tauri::command]
pub async fn select_files() -> Result<Vec<String>, String> {
    // let res = Arc::new(Mutex::new(Err("No file selected".to_string())));
    // let res_clone = res.clone();
    //
    // FileDialogBuilder::new().pick_files(move |file_paths| {
    //     let mut locked_res = res_clone.lock().unwrap();
    //     if file_paths.is_none() {
    //         *locked_res = Err("No file was selected".to_string());
    //     } else {
    //         *locked_res = Ok(file_paths.unwrap().iter().map(|path| path.to_str().unwrap().to_string()).collect());
    //     }
    // })
    //
    // std::thread::sleep(Duration::from_millis(2800));
    //
    // let locked_res = res.lock().unwrap();
    // locked_res.clone()
    let (sender, receiver) = futures::channel::oneshot::channel();

    FileDialogBuilder::new().pick_files(move |file_paths| {
        if file_paths.is_none() {
            sender.send(Err("No file was selected".to_string())).unwrap();
        } else {
            let paths = file_paths.unwrap().iter().map(|path| path.to_str().unwrap().to_string()).collect();
            sender.send(Ok(paths)).unwrap();
        }
    });


    receiver.await.unwrap()
}