export default class db{
    constructor () {
        this.request = indexedDB.open("MyTestDatabase");
        console.log(this.request);
        this.request.onerror = function(event) {
            alert("なぜ私の ウェブアプリで IndexedDB を使わせてくれないのですか?!");
        };
        this.request.onsuccess = function (event) {
            this.db = event.target.result;
            console.log(this.db)
            if(this.db.objectStoreNames.contains('task')) { //アップデートする際、同名のオブジェクトがあるとアップデートできないため、データを削除。データのマージに関しては、今後記事にします。
                console.log("hi")
                this.db.deleteObjectStore('task');
              }
            this.objectStore = this.db.createObjectStore("task", { keyPath: "id", autoIncrement: true }); //オブジェクトストアの作成
            this.objectStore.createIndex("start_timeIndex", "start_time", { unique: false }); //インデックスの作成
            this.objectStore.createIndex("end_timeIndex", "end_time", { unique: false });
            this.objectStore.createIndex("add_timeIndex", "add_time", { unique: false });
            this.objectStore.createIndex("updt_timeIndex", "updt_time", { unique: false });
            this.objectStore.createIndex("task_nameIndex", "task_name", { unique: false });
            console.log("objicttis ",this.objectStore)
        };

    }

}
