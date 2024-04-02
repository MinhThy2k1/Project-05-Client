import React, { useEffect, useState } from 'react'
import { uploadToFirebase } from '../../../../service/firebase';
import { api } from '../../../../service/apis';
import "./createhotel.scss"
import { randomId } from '@mieuteacher/meomeojs';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { Spinner } from 'react-bootstrap';
import { hotelAction } from '../../../../store/slices/hotel.slice';
import { StoreType } from '../../../../store';
import { useParams } from 'react-router-dom';
interface PicturePreview {
    imgUrl: string;
    file: File;
}
interface uploadToFirebase {
    file: any;
    fallBackUrl: any;
}
export default function Createhotel() {
    const [picturesPreview, setPicturesPreview] = useState<PicturePreview[]>([]);
    const userStore = useSelector((store: StoreType) => store.userStore)
    console.log("userStore", userStore);
    const userId = userStore.data.id
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)
    console.log("hoteldata", hotelStore);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState("");
    const dispatch = useDispatch();

    async function handleAddHotel(e: React.FormEvent) {
        console.log("co vao day ko");
        e.preventDefault();
        if (!(e.target as any).image.files[0]) return;
        console.log("123");

        try {
            setIsLoading(true);
            const newHotel = {
                name: (e.target as any).name.value,
                type: (e.target as any).type.value,
                city: (e.target as any).city.value,
                address: (e.target as any).address.value,
                distance: (e.target as any).distance.value,
                userId: userId,
                locationDescription: (e.target as any).description.value,
                cheapestprice: Number((e.target as any).price.value),
                image: null,
                contact: null,
            };
            try {
                newHotel.image = await uploadToFirebase((e.target as any).image?.files[0], null);
            } catch (err: any) {
                console.log(err);
                console.log("ảnh đã lỗi");
            }
            try {
                newHotel.contact = await uploadToFirebase((e.target as any).contact?.files[0], null);
            } catch (err: any) {
                console.log(err);
                console.log("ảnh đã lỗi");
            }
            console.log("newHotel:=", newHotel);
            const img: any[] = [];
            for (const item of picturesPreview) {
                const imgUrl = await uploadToFirebase(item.file, null);
                img.push({ imgUrl });
            }

            const result = await api.hotel.create({
                newHotel,
                img
            });
            console.log("result", result);

            Modal.success({
                title: "Notification",
                content: "Bạn đã thêm sản phẩm thành công!",
                onOk: () => {
                    console.log("result.data.data", result.data);
                    // dispatch(hotelAction.addData(result.data.data));
                    setPicturesPreview([]);
                    window.location.href = "/partner/pending-status";
                    setIsLoading(false);
                }
            });
        } catch (err: any) {
            console.log(err);
            alert("lỗi gì đó");
            setIsLoading(false);
        }
    }
    return (
        <div className='new'>
            <div className='newContainer'>
                <div className="top">
                    <h1>Add New Product</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={(e) => handleAddHotel(e)}>
                            <div className="left">

                                <div className='input_avatar'>
                                    <label htmlFor="">Picture Main Hotel</label>
                                    <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="image" />
                                    <input onChange={(e) => {
                                        if ((e.target as any).files.length > 0) {
                                            const spanEl = (e.target as any).parentNode.querySelector('span');
                                            const imgEl = (e.target as any).parentNode.querySelector('img');
                                            spanEl.style.opacity = "0";
                                            imgEl.src = URL.createObjectURL((e.target as any).files[0]);
                                        }
                                    }} name='image' type="file" />
                                    <span>+</span>
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className='box-img-kinhdoanh'>
                                <label htmlFor="Name">Giấy phép kinh doanh</label>
                                <div className='input_giayphep'>
                                    <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="image" />

                                    <input onChange={(e) => {
                                        if ((e.target as any).files.length > 0) {
                                            const spanEl = (e.target as any).parentNode.querySelector('span');
                                            const imgEl = (e.target as any).parentNode.querySelector('img');
                                            spanEl.style.opacity = "0";
                                            imgEl.src = URL.createObjectURL((e.target as any).files[0]);
                                        }
                                    }} name='contact' type="file" />
                                    <span>+</span>
                                </div>
                            </div>
                            <div className='formInput'>
                                <label htmlFor="file">Hotel Pictures</label>
                                <input onChange={(e) => {
                                    const tempArr: PicturePreview[] = [];
                                    if ((e.target as any).files.length > 0) {
                                        for (const file of (e.target as any).files) {
                                            tempArr.push({
                                                imgUrl: URL.createObjectURL(file),
                                                file
                                            });
                                        }
                                    }
                                    if (picturesPreview.length + tempArr.length > 7) {
                                        alert("max size 10");
                                        return;
                                    }
                                    setPicturesPreview([...tempArr, ...picturesPreview]);
                                }} type="file" multiple max={6} />
                            </div>
                            <div className='box-show-image'>
                                <div className='pictures'>
                                    {
                                        picturesPreview.map((item, index) => (
                                            <div key={randomId()} className='item'>
                                                <span onClick={() => {
                                                    setPicturesPreview(picturesPreview.filter((itemFilter, indexFilter) => indexFilter !== index));
                                                }} className='icon-x'>X</span>
                                                <img src={item.imgUrl} alt={`picture-${index}`} />

                                            </div>
                                        ))

                                    }

                                </div>
                            </div>

                            <div className='formInput'>
                                <label htmlFor="Name">Name</label>
                                <input id="name" type="text" />
                            </div>
                            <div className='formInput'>
                                <label htmlFor="type">Type</label>
                                <select name="type" id="type">
                                    <option value="hotel">Hotel</option>
                                    <option value="resort">Resort</option>
                                    <option value="apartment">Apartment</option>
                                </select>
                            </div>
                            <div className='formInput'>
                                <label htmlFor="city">City</label>
                                <select name="city" id="city">
                                    <option value="TP.Hồ Chí Minh">TP.Hồ Chí Minh</option>
                                    <option value="Hanoi">Hà Nội</option>
                                    <option value="Vung Tau">Vũng Tàu</option>
                                </select>
                            </div>
                            <div className='formInput'>
                                <label htmlFor="address">Address</label>
                                <input id="address" type="text" />
                            </div>
                            <div className='formInput'>
                                <label htmlFor="distance">Distance from city center</label>
                                <input id="distance" type="text" />
                            </div>
                            <div className='formInput'>
                                <label htmlFor="description">Description</label>
                                <input id="description" type="text" />
                            </div>
                            <div className='formInput'>
                                <label htmlFor="price">Price Cheapest</label>
                                <input id="price" type="text" />
                            </div>
                            {/* <div className='formInput'>
                                <label htmlFor="userid">id</label>
                                <input id="userid" type="text" />
                            </div> */}
                            <button type='submit' className='btn-update' disabled={isLoading}>
                                {isLoading ? (
                                    <Spinner className='loading' animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}
