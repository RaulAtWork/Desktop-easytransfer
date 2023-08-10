use std::{fs, path};
use std::io::{BufWriter, Read, Write};
use std::net::TcpStream;
use std::os::windows::prelude::MetadataExt;

// #[tauri::command]
#[tauri::command(rename_all = "snake_case")]
pub async fn send_files(ip: String, folder: String, files: Vec<String>, port: usize, chunkSize: usize) {
    println!("Sending file...");
    let mut file = fs::File::open(files.get(1).unwrap()).unwrap();
    let metadata = file.metadata().unwrap();

    let file_name = path::Path::new(files.get(1).unwrap()).file_name().unwrap().to_str().unwrap().to_string();
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

    let mut file_contents: Vec<u8> = vec![0; chunkSize];


    let mut total_written = 0;
    while total_written < file_size {
        println!("Total written: {}", total_written);
        let mut nread = 0;
        while nread < chunkSize {
            println!("Reading from file...");
            nread += file.read(&mut file_contents[nread..]).unwrap();
            if total_written + nread == file_size || nread == 0 {
                println!("OJO!");
                break;
            }
        }
        let _ = buf_writer.write_all(&file_contents[..nread]);
        total_written += nread;
    }
    println!("Waiting for ack!");
    let mut ack = [0u8; 1];
    let _ = stream_cpy_for_reading.read_exact(&mut ack);
    let ack = std::str::from_utf8(&ack).unwrap();
    println!("{}", ack);

    println!("DONE!");
}