// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{fs, vec};
use serde::{Deserialize, Serialize};
use std::path::Path;
use tauri::{command, Window};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, Deserialize, Serialize)]
struct Question {
    question: String,
    a: String,
    b: String,
    c: String,
    d: String,
    e: String,
    answer: String,
}
#[derive(Debug, Serialize, Deserialize)]
struct Glossary {
    title: String,
    season: String,
    glossaryList: Vec<Question>,
}
#[derive(Debug, Deserialize, Serialize)]
struct QuizData{
    glossary: Glossary,
}

#[command]
fn read_json_files(directory_path: &str) -> Vec<QuizData> {
    let mut items: Vec<QuizData> = Vec::new();

    let entries_result = fs::read_dir(directory_path);
    let entries = match entries_result {
        Ok(entries) => entries,
        Err(err) => {
            eprintln!("Failed to read directory: {:?}", err);
            return items;
        }
    };

    for entry_result in entries {
        let entry = match entry_result {
            Ok(entry) => entry,
            Err(err) => {
                eprintln!("Failed to read directory entry: {:?}", err);
                continue;
            }
        };

        let file_path = entry.path();
        let extension = match file_path.extension() {
            Some(extension) => extension,
            None => continue,
        };

        if extension != "json" {
            continue;
        }

        let json_data_result = fs::read_to_string(&file_path);
        let json_data = match json_data_result {
            Ok(json_data) => json_data,
            Err(err) => {
                eprintln!("Failed to read JSON file: {:?}", err);
                continue;
            }
        };

        println!("JSON Data for {}: {}", file_path.display(), json_data);

        let item_result = serde_json::from_str::<QuizData>(&json_data);
        let item = match item_result {      
            Ok(item) => item,
            Err(err) => {
                eprintln!("Failed to parse JSON file: {:?}", err);
                continue;
            }
        };
        items.push(item);
    }
    items
}

fn main() {
    let directory_path = "data";

    let items = read_json_files(directory_path);
    // println!("Items: {:?}", items);
    // println!("items1 {:?}", items[0].glossary.[0]);
   
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![read_json_files])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}