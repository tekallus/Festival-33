import { useState } from 'react'

//Öncelikle, PosterSection bileşenindeki grupları filtrelemek ve sıralamak için date prop'unu kullanacağız.
//Ardından, bu grupları önem sırasına göre sıralayacağız ve her bir grup için uygun sınıf adını belirleyeceğiz.
//Son olarak, tarihler için ayrılmış bölümlerde grupları render edeceğiz.
export default function PosterSection({ date, festivalData }) {
  // Belirli bir tarih için grupları filtrele ve öneme göre sıralayalim
  const filteredAndSortedGroups = festivalData
    .filter((group) => group.date === date) // Belirli bir tarihte çalan grupları filtreleyerek ayni tarihli olanlari secelim
    .sort((a, b) => a.importance - b.importance) // Grupları öneme göre sıralama 1 en onemli 4 en az onemli yani a.importance - b.importance
  //Eğer a.importance 1'den küçükse ve b.importance 1'den büyükse, çıkarma işlemi negatif bir değer üretir. Bu durumda, a öğesi b öğesinden daha önemli kabul edilir ve a öğesi b öğesinden önce dizide yer alır.
  //Eğer a.importance ve b.importance eşitse, çıkarma işlemi sıfır değeri üretir. Bu durumda, grupların önem düzeyleri aynı kabul edilir ve sıralamada değişiklik yapılmaz.
  //eğer a.importance 1'den büyükse ve b.importance 1'den küçükse, çıkarma işlemi pozitif bir değer üretir. Bu durumda, b öğesi a öğesinden daha önemli kabul edilir ve b öğesi a öğesinden önce dizide yer alır.
  return (
    <div className="lineup-container">
      {/* Tarih başlığı */}
      <div className="day-container">
        <h3>{date}</h3>
      </div>

      {/* Filtrelenmiş ve sıralanmış grupları render edelim */}
      {filteredAndSortedGroups.map((group) => (
        <p className={getClassByImportance(group.importance)} key={group.name}>
          {group.name}
          {/* Her bir paragraf öğesi, group objesinin importance özelliğine dayanarak bir class adı alır. getClassByImportance fonksiyonu, grupların önemine bağlı olarak doğru class adını döndürür.  */}
        </p>
      ))}

      {/* Footer */}
      <div className="footer"></div>
    </div>
  )
}

// Grup önemine göre uygun sınıfı döndüren yardımcı bir fonksiyon
function getClassByImportance(importance) {
  switch (importance) {
    case 1:
      return 'giant' // En önemli gruplar için büyük puntolar
    case 2:
      return 'big' // Daha az önemli gruplar için büyük puntolar
    case 3:
      return 'medium' // Orta önemli gruplar için orta puntolar
    case 4:
      return 'small' // En az önemli gruplar için küçük puntolar
    default:
      return '' // Önem değeri belirtilmemişse boş sınıf adı
  }
}
