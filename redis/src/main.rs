use anyhow::Result;
use bytes::Bytes;
use resp::Value::{Error, SimpleString};
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tokio::net::{TcpListener, TcpStream};

mod resp;
type Db = Arc<Mutex<HashMap<String, Bytes>>>;
#[tokio::main]
async fn main() -> Result<()> {
    let listener = TcpListener::bind("127.0.0.1:6379").await?;
    println!("Started Redis Server");
    let db: Db = Arc::new(Mutex::new(HashMap::new()));
    loop {
        let db = db.clone();
        let incoming = listener.accept().await;
        match incoming {
            Ok((stream, _)) => {
                println!("accepted new connection");
                tokio::spawn(async move {
                    handle_stream(stream, db).await.unwrap();
                });
            }
            Err(e) => {
                println!("error: {}", e);
            }
        }
    }
}

async fn handle_stream(stream: TcpStream, db: Db) -> Result<()> {
    let mut conn = resp::RespConnection::new(stream);
    loop {
        let value = conn.read_value().await?;
        if let Some(value) = value {
            let (command, args) = value.to_command()?;
            let response = match command.to_ascii_lowercase().as_ref() {
                "ping" => SimpleString("PONG".to_string()),
                "echo" => args.first().unwrap().clone(),
                "set" => {
                    let mut db = db.lock().unwrap();
                    db.insert(args[0].unwrap_bulk(), Bytes::from(args[1].unwrap_bulk()));
                    SimpleString("OK".to_string())
                }
                "get" => {
                    let db = db.lock().unwrap();
                    let val = db.get(&args[0].unwrap_bulk()).unwrap();
                    SimpleString(String::from_utf8(val.to_vec()).unwrap())
                }
                _ => Error(format!("command not implemented: {}", command)),
            };
            conn.write_value(response).await?;
        } else {
            break;
        }
    }
    Ok(())
}
