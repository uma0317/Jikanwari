const _tableItems = [
    {"id": 1, "day": "月", "name": "プログラミング基礎", "place": "E231", "startHour": 8, "startMinutes": 50, "endHour": 10, "endMinutes": 20},
    {"id": 2, "day": "水", "name": "電磁気学基礎", "place": "パソコン演習室", "startHour": 13, "startMinutes": 0, "endHour": 14, "endMinutes": 30},
    {"id": 3, "day": "火", "name": "英語", "place": "A211", "startHour": 14, "startMinutes": 45, "endHour": 16, "endMinutes": 15}
]

export default {
    getAllTableItems (cb) {
        return cb(_tableItems)
    }
}