import React, { useMemo, useEffect } from 'react'
import { useParams, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cardSlice';
import { Button } from 'antd';

// Veri tipi tanımlamaları
interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface DataState {
  data: Item[];
}

const dataFinder = (data: Item[], id?: string): Item | undefined => {
  const dataById = data.find(item => item.id === id);
  return dataById;
}

const ProductDetail: React.FC = () => {
  let { id } = useParams<{id: string}>();
  const { data } = useSelector((state: { data: DataState }) => state.data);

  const dataToRender = useMemo(() => dataFinder(data, id), [data, id])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      navigate(generatePath("productList"));
    }
  }, [id, navigate])

  const handleAddTocard = () => {
    if (dataToRender) {
      dispatch(addItem(dataToRender));
    }
  }

  return (
    <>
      {dataToRender &&
        <div className={"detail-root"}>
          <div className={"image"}>
            <img src={dataToRender.image} alt={dataToRender.name} />
          </div>
          <div className={"info"}>
            <div className={"name"}>
              {dataToRender.name}
            </div>
            <div className={"price"}>
              {`${dataToRender.price} $`}
            </div>
            <Button
              type="primary"
              className={"actionButton"}
              onClick={handleAddTocard}>
              Add to card
            </Button>
            <p>{dataToRender.description}</p>
          </div>
        </div>
      }
    </>
  );
}

export default ProductDetail;
