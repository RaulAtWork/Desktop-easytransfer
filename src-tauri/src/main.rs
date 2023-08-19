// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::client::send_files;
use crate::client::select_files;
use crate::server::server;


mod client;
mod server;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("WOOOO {}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, send_files, server, select_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
