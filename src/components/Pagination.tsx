import React from "react";
import { Pagination } from "antd";

// Props için bir interface tanımlaması yapılıyor.
interface PaginationProps {
  defaultPageSize?: number; // '?' işareti bu prop'un isteğe bağlı olduğunu belirtir.
  totalData: number; // 'totalData' sayısı, zorunlu bir prop.
  onChange: (page: number, pageSize: number) => void; // Sayfa değişikliği fonksiyonu, hangi sayfaya gidileceği ve sayfa boyutu bilgisi ile çağrılacak.
  currentPage?: number; // Geçerli sayfa numarası, isteğe bağlı.
}

// 'Paginator' bileşeni, yukarıda tanımlanan props interface'ini kullanarak oluşturuluyor.
const PaginationComponent: React.FC<PaginationProps> = ({
  defaultPageSize = 12,
  totalData,
  onChange,
  currentPage = 1,
}) => {
  return (
    <Pagination
      defaultCurrent={1}
      total={totalData}
      defaultPageSize={defaultPageSize}
      onChange={onChange}
      current={currentPage}
      pageSizeOptions={["12"]} // 'pageSizeOptions' dizisinin elemanları string olarak belirtilmeli.
      hideOnSinglePage
    />
  );
};

export default PaginationComponent;
