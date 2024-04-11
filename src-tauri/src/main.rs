use std::{fs, vec};
use serde::{Deserialize, Serialize};
use std::path::Path;
#[derive(Debug, Deserialize, Serialize)]
struct GlossaryList {
    question: String,
    a: String,
    b: String,
    c: String,
    d: String,
    e: String,
    answer: String,
}
#[derive(Debug, Deserialize, Serialize)]
struct Item {
    glossary: String,
    title: String,
    season: String,
    number: String,
    glossaryList: Vec<GlossaryList>,


}

fn read_json_files(directory_path: &str) -> Vec<Item> {
    let mut items: Vec<Item> = Vec::new();

    match fs::read_dir(directory_path) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let file_path = entry.path();
                        if let Some(extension) = file_path.extension() {
                            if extension == "json" {
                                match fs::read_to_string(&file_path) {
                                    Ok(json_data) => {
                                        println!("JSON Data for {}: {}", file_path.display(), json_data);

                                        match serde_json::from_str::<Item>(&json_data) {
                                            Ok(item) => {
                                                println!("item: {:?}", item);
                                                items.push(item);
                                            }
                                            Err(err) => {
                                                eprintln!("Failed to parse JSON file: {:?}", file_path);
                                            }
                                        }
                                    }
                                    Err(err) => {
                                        eprintln!("Failed to read JSON file: {:?}", file_path);
                                    }
                                }
                            }
                        }
                    }
                    Err(err) => {
                        eprintln!("Failed to read directory entry: {:?}", err);
                    }
                }
            }
        }
        Err(err) => {
            eprintln!("Failed to read directory: {:?}", err);
        }
    }

    items
}


fn main() {
    let directory_path = "data";

    let items = read_json_files(directory_path);
    println!("Items: {:?}", items);
    
}




// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
