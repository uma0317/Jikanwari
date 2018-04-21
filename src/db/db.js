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
          objectStore.createIndex("day", "day", { unique: false })
          objectStore.createIndex("name", "name", { unique: false })
          objectStore.createIndex("classRoom", "classRoom", { unique: false })
          objectStore.createIndex("startHour", "startHour", { unique: false })
          objectStore.createIndex("startMinutes", "startMinutes", { unique: false })
          objectStore.createIndex("endHour", "endHour", { unique: false })
          objectStore.createIndex("endMinutes", "endMinutes", { unique: false })

          var objectStore = db.createObjectStore("settings", {autoIncrement: true})
          objectStore.createIndex("dayNum", "dayNum", { unique: false }) 
          objectStore.createIndex("startHour", "startHour", { unique: false })
          objectStore.createIndex("endHour", "endHour", { unique: false })
          objectStore.createIndex("vertical", "vertical", { unique: false })
          objectStore.createIndex("horizontal", "horizontal", { unique: false })
          objectStore.transaction.oncomplete = function(event) {
            var transaction = db.transaction("settings","readwrite")
            var objectStore = transaction.objectStore("settings")
            var request = objectStore.put(
                {
                    dayNum: 5,
                    startHour: 8,
                    endHour: 18,
                    vertical: true,
                    horizontal: true
                },0
            )
          
            transaction.oncomplete = function() {
                alert('保存成功')
                db.close()
            }
            
            transaction.onerror = function(error) { 
                alert('保存失敗。エラーメッセージ:', error)
            }
          }

          
        }
        request.onsuccess = function(event) {
            console.log("success")
        }
        cb()
    },
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
            var transaction = db.transaction("settings","readonly")
            var store = transaction.objectStore("settings")
            var index = store.get(0)
            
            index.onsuccess = function(event) {
                db.close()                
                return cb(event.target.result)
            }
            transaction.oncomplete = function() {
  
                db.close()
            }
          
            transaction.onerror = function(error) {
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
            var transaction = db.transaction("settings","readwrite")
            var objectStore = transaction.objectStore("settings")
            var request = objectStore.put(data, 0)
            
            transaction.oncomplete = function() {
                db.close()
            }
          
            transaction.onerror = function(error) {
              alert('保存失敗。エラーメッセージ:', error)
            }
        }
    },
    addItem(data, cb) {
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
            var transaction = db.transaction("lesson","readwrite")
            var objectStore = transaction.objectStore("lesson")
            var request = objectStore.add(
                data           
            )
            
            transaction.oncomplete = function() {
                 alert('保存成功')
                db.close()
                cb()

            }
          
            transaction.onerror = function(error) {
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
            var transaction = db.transaction("lesson","readonly")
            var store = transaction.objectStore("lesson")
            var keys = store.getAllKeys()
            keys.onsuccess = function(event) {
                var index = store.getAll()
                var resultData = {}
                index.onsuccess = function(evt) {
                    for(let key in event.target.result) {
                        resultData[parseInt(event.target.result[key])] = evt.target.result[key]
                    }
                    db.close()
   
                    
                    return cb(resultData)
                }
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
            var transaction = db.transaction("lesson","readwrite")
            var objectStore = transaction.objectStore("lesson")
            console.log("update: " + id)
            var req = objectStore.put(data, id)
            transaction.oncomplete = function(){
            console.log("complete")
                
                db.close()
            }
            transaction.onerror = function(error) {
              alert('保存失敗。エラーメッセージ:', error)
            }
            db.close()
        }
    },
    deleteLesson(id, cb) {
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
        
        var request = window.indexedDB.open(dbName, 2)
        request.onerror = function(event) {
          console.log("error: ")
        }
        request.onsuccess = function(event) {
            var db = request.result
            var transaction = db.transaction("lesson","readwrite")
            var objectStore = transaction.objectStore("lesson")
            var req = objectStore.delete(parseInt(id))
            req.onsuccess = function(event) {
                console.log(event)
                console.log("delete: " + id)                
                var test = objectStore.getAll()
                test.onsuccess = function(evt) {
                    console.log("delete after")
                    console.log(evt.target)
                    cb()
                }
                db.close()
                
                
            }
            transaction.oncomplete = function(event){

            }
            transaction.onerror = function(error) {
              alert('保存失敗。エラーメッセージ:', error)
            }
            db.close()
        }
    }
}