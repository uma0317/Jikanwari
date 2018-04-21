var dbName = "jikanwariDB"
export default {
    init(cb) {
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        var request = window.indexedDB.open(dbName, 1)
        var db
        request.onupgradeneeded = function(event) {
            console.log("init")
            
            db = event.target.result
            console.log(db)
          var objectStore = db.createObjectStore("lesson", {autoIncrement: true})
          objectStore.createIndex("day", "day", { unique: false }) //インデックスの作成
          objectStore.createIndex("name", "name", { unique: false })
          objectStore.createIndex("classRoom", "classRoom", { unique: false })
          objectStore.createIndex("startHour", "startHour", { unique: false })
          objectStore.createIndex("startMinutes", "startMinutes", { unique: false })
          objectStore.createIndex("endHour", "endHour", { unique: false })
          objectStore.createIndex("endMinutes", "endMinutes", { unique: false })

          var objectStore = db.createObjectStore("settings", {autoIncrement: true})
          objectStore.createIndex("dayNum", "dayNum", { unique: false }) //インデックスの作成
          objectStore.createIndex("startHour", "startHour", { unique: false })
          objectStore.createIndex("endHour", "endHour", { unique: false })
          objectStore.createIndex("vertical", "vertical", { unique: false })
          objectStore.createIndex("horizontal", "horizontal", { unique: false })
          objectStore.transaction.oncomplete = function(event) {
            var transaction = db.transaction("settings","readwrite") //処理用のトランザクションを作ります。
            var objectStore = transaction.objectStore("settings") //オブジェクトストアにアクセスします。
            var request = objectStore.put(
                {
                    dayNum: 5,
                    startHour: 8,
                    endHour: 18,
                    vertical: true,
                    horizontal: true
                },0
            )
          
            transaction.oncomplete = function() { //追加成功の処理
                alert('保存成功')
                db.close()
            //   tasks.getAll(tasks.renderAll)
            }
            
            transaction.onerror = function(error) { //追加失敗の処理
                alert('保存失敗。エラーメッセージ:', error)
            }
          }

          
        }
        request.onsuccess = function(event) {
            console.log("success")
        }
        cb()
    },
    // initSettings() {
    //     window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
    //     window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
    //     if (!window.indexedDB) {
    //       window.alert("Your browser doesn't support a stable version of IndexedDB.")
    //     }
    //     var request = window.indexedDB.open(dbName)
    //     var db
    //     request.onupgradeneeded = function(event) {
    //         db = request.result
    //         var objectStore = db.createObjectStore("settings", {autoIncrement: true})
    //         objectStore.createIndex("dayNum", "dayNum", { unique: false }) //インデックスの作成
    //         objectStore.createIndex("startHour", "startHour", { unique: false })
    //         objectStore.createIndex("endHour", "endHour", { unique: false })
    //         objectStore.createIndex("vertical", "vertical", { unique: false })
    //         objectStore.createIndex("horizontal", "horizontal", { unique: false })
    //         var transaction = db.transaction("settings","readwrite") //処理用のトランザクションを作ります。
    //         var objectStore = transaction.objectStore("settings") //オブジェクトストアにアクセスします。

    //         var request = objectStore.put(
    //             {
    //                 dayNum: 5,
    //                 startHour: 8,
    //                 endHour: 18,
    //                 vertical: true,
    //                 horizontal: true
    //             },0
    //         )
          
    //         transaction.oncomplete = function() { //追加成功の処理
    //             alert('保存成功')
    //             db.close()
    //         //   tasks.getAll(tasks.renderAll)
    //         }
            
    //         transaction.onerror = function(error) { //追加失敗の処理
    //             alert('保存失敗。エラーメッセージ:', error)
    //         }
    //         db.close()
    //     }
    // },
    getSettings(cb) {
        console.log("get settings")
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        
        var request = window.indexedDB.open(dbName,2)
        var db
        request.onerror = function(event) {
            console.log("error: ")
          }
        request.onsuccess = function(event) {
            db = event.target.result
            var transaction = db.transaction("settings","readonly") //処理用のトランザクションを作ります。
            var store = transaction.objectStore("settings") //オブジェクトストアにアクセスします。
            var index = store.get(0)
            
            index.onsuccess = function(event) {
                db.close()                
                return cb(event.target.result)
            }
            transaction.oncomplete = function() { //追加成功の処理
  
                db.close()
            //   tasks.getAll(tasks.renderAll)
            }
          
            transaction.onerror = function(error) { //追加失敗の処理
              alert('保存失敗。エラーメッセージ:', error)
            }
        }

    },
    updateSettings(data) {
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        
        var request = window.indexedDB.open(dbName,2)
        request.onerror = function(event) {
          console.log("error: ")
        }
        request.onsuccess = function(event) {
            console.log(event)
            var db = event.target.result
            var transaction = db.transaction("settings","readwrite") //処理用のトランザクションを作ります。
            var objectStore = transaction.objectStore("settings") //オブジェクトストアにアクセスします。
            var request = objectStore.put(data, 0)
            
            transaction.oncomplete = function() { //追加成功の処理
  
                db.close()
            //   tasks.getAll(tasks.renderAll)
            }
          
            transaction.onerror = function(error) { //追加失敗の処理
              alert('保存失敗。エラーメッセージ:', error)
            }
        }
    },
    addLesson(data) {
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        
        var request = window.indexedDB.open(dbName, 2)
        request.onerror = function(event) {
          console.log("error: ")
        }
        request.onsuccess = function(event) {
            console.log(event)
            var db = event.target.result
            var transaction = db.transaction("lesson","readwrite") //処理用のトランザクションを作ります。
            var objectStore = transaction.objectStore("lesson") //オブジェクトストアにアクセスします。
            var request = objectStore.add(
                data           
            )
            
            transaction.oncomplete = function() { //追加成功の処理
              alert('保存成功')
            db.close()
            //   tasks.getAll(tasks.renderAll)
            }
          
            transaction.onerror = function(error) { //追加失敗の処理
              alert('保存失敗。エラーメッセージ:', error)
            }
        }
    },
    getAllLesson(cb) {
        console.log("get all lesson")
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        
        var request = window.indexedDB.open(dbName,2)
        var db
        request.onerror = function(event) {
            console.log("error: ")
          }
        request.onsuccess = function(event) {
            db = event.target.result
            var transaction = db.transaction("lesson","readonly") //処理用のトランザクションを作ります。
            var store = transaction.objectStore("lesson") //オブジェクトストアにアクセスします。
            var index = store.getAll()
            
            index.onsuccess = function(event) {
                db.close()                
                return cb(event.target.result)
            }
        }
    },
    
    getLessonById(id, cb) {
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        
        var request = window.indexedDB.open(dbName,2)
        var db
        request.onerror = function(event) {
            console.log("error: ")
          }
        request.onsuccess = function(event) {
            db = event.target.result
            var transaction = db.transaction("lesson","readonly") //処理用のトランザクションを作ります。
            var store = transaction.objectStore("lesson") //オブジェクトストアにアクセスします。
            console.log(id)
            
            var req = store.get(id)
            console.log(req)

            req.onsuccess = function(event) {
                console.log(event)
                db.close()                
                return cb(event.target.result)
            }
        }
    },

    updateLesson(id, data) {
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        if (!window.indexedDB) {
          window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        
        var request = window.indexedDB.open(dbName)
        request.onerror = function(event) {
          console.log("error: ")
        }
        
        request.onsuccess = function(event) {
            var db = request.result
            var transaction = db.transaction("lesson","readwrite") //処理用のトランザクションを作ります。
            var objectStore = transaction.objectStore("lesson") //オブジェクトストアにアクセスします。
            var req = objectStore.put(data, id)
            transaction.oncomplete = function(){
                db.close()
            }
            transaction.onerror = function(error) { //追加失敗の処理
              alert('保存失敗。エラーメッセージ:', error)
            }
            db.close()
        }
    },
}