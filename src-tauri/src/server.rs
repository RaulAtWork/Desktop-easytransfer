use std::fs::File;
use std::io::{BufReader, Read, Write};
use std::net::TcpListener;
use easytransfer_rs::{CHUNK_SIZE, FileInfo};

pub fn server() {
    println!("Running server...");
    let listener =TcpListener::bind("localhost:3287").unwrap();
    for stream in listener.incoming() {
        println!("Connection received. Parsing header...");
        // Set up buffered reader and File Info header
        let mut stream = stream.unwrap();
        let mut stream_cpy_for_writing = stream.try_clone().unwrap();
        // let mut stream_cpy_for_reading = stream.try_clone().unwrap();
        let mut buf_reader = BufReader::new(&mut stream);
        let mut file_info = FileInfo::new();

        file_info.read_file_size(&mut buf_reader);
        file_info.read_name_size(&mut buf_reader);
        file_info.read_file_name(&mut buf_reader);

        println!("FileInfo: {:?}", file_info);
        println!("Creating file...");

        let mut file = File::create(&file_info.file_name).unwrap();
        let mut file_contents: Vec<u8> = vec![0; CHUNK_SIZE];

        // More efficient but "unsafe" :(
        // let mut file_contents: Vec<u8> = Vec::with_capacity(CHUNK_SIZE);
        // unsafe { file_contents.set_len(CHUNK_SIZE); }


        let mut total_read = 0;
        while total_read < file_info.file_size {
            println!("Total read: {}", total_read);
            // Read from stream into buffer
            let mut nread = 0;
            println!("Chunk reading begins");
            while nread < CHUNK_SIZE {
                println!("Reading...");
                nread += buf_reader.read(&mut file_contents[nread..]).unwrap();
                println!("N read: {}", nread);
                //nread += stream_cpy_for_reading.read(&mut file_contents).unwrap();
                if total_read + nread == file_info.file_size|| nread == 0 {
                    println!("OJO!");
                    let _ = stream_cpy_for_writing.write_all("y".as_bytes());
                    //total_read = file_info.file_size;
                    break;
                }
            }
            // Flush buffer and write it into file
            //let bound = file_contents.len();
            let _ = file.write(&mut file_contents[..nread]);
            total_read += nread;
        }
        println!("DONE!");

    }

}