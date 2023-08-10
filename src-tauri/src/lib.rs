use std::io::{BufReader, Read};
use std::net::TcpStream;

#[derive(Debug)]
pub struct FileInfo {
    pub file_size: usize,
    pub name_size: usize,
    pub file_name: String,
}

pub const TO_MEGABYTES: usize = 1000000;
pub const CHUNK_SIZE: usize = 100 * TO_MEGABYTES;

impl FileInfo {
    pub fn new() -> Self {
        FileInfo {
            file_size: 0,
            name_size: 0,
            file_name: "".to_string(),
        }
    }
    pub fn read_file_size(&mut self, buf_reader: &mut BufReader<&mut TcpStream>) {
        let mut file_size_buffer = [0u8; 8];
        let _ = buf_reader.read_exact(&mut file_size_buffer);
        self.file_size = usize::from_le_bytes(file_size_buffer);
    }
    pub fn read_name_size(&mut self, buf_reader: &mut BufReader<&mut TcpStream>) {
        let mut name_size_buffer = [0u8; 8];
        let _ = buf_reader.read_exact(&mut name_size_buffer);
        self.name_size = usize::from_le_bytes(name_size_buffer);
    }
    pub fn read_file_name(&mut self, buf_reader: &mut BufReader<&mut TcpStream>) {
        let mut file_name_buffer: Vec<u8> = vec![0; self.name_size];
        let _ = buf_reader.read_exact(&mut file_name_buffer);

        self.file_name = std::str::from_utf8(&file_name_buffer).unwrap().to_string();
    }
}