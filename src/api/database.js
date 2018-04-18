const _tableItems = [
    {"id": 1, "day": "月", "name": "プログラミング基礎", "classRoom": "E231", "teacher": "tanaka", "startHour": 8, "startMinutes": 50, "endHour": 9, "endMinutes": 30},
    {"id": 2, "day": "水", "name": "電磁気学基礎だよよよよyfdさfdさっfdさ", "classRoom": "パソコン演習室", "teacher": "yoshida", "startHour": 13, "startMinutes": 50, "endHour": 15, "endMinutes": 20},
    {"id": 3, "day": "火", "name": "英語", "classRoom": "A211", "teacher": "maeda",  "startHour": 13, "startMinutes": 50, "endHour": 15, "endMinutes": 20},
    {"id": 4, "day": "月", "name": "プログラミング基礎", "classRoom": "E231", "teacher": "yamada", "startHour": 13, "startMinutes": 50, "endHour": 15, "endMinutes": 20},

]

export default {
    getAllTableItems (cb) {
        return cb(_tableItems)
    }
}