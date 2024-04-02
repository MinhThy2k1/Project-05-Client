import React, { useState } from 'react'
import { uploadToFirebase } from '../../../../../service/firebase';
import { api } from '../../../../../service/apis';
import "./createroom.scss"
import { randomId } from '@mieuteacher/meomeojs';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { roomAction } from '../../../../../store/slices/room.slice';
import { StoreType } from '../../../../../store';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
export enum StatusSelect {
    Yes = "Yes",
    No = "No",
}
interface PicturePreview {
    imgUrl: string;
    file: File;
}
interface uploadToFirebase {
    file: any;
    fallBackUrl: any;
}
export default function Createroom() {
    const [selectoption, setselectoption] = useState("No")
    const [picturesPreview, setPicturesPreview] = useState<PicturePreview[]>([]);
    const userStore = useSelector((store: StoreType) => store.userStore)
    console.log("userStore", userStore);
    const userId = userStore.data.id
    const { id } = useParams()
    console.log("id", Number(id));

    const hotelStore = useSelector((store: StoreType) => store.hotelStore)

    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState("");
    const dispatch = useDispatch();
    async function handleAddRoom(e: React.FormEvent) {
        e.preventDefault();
        if (!(e.target as any).image.files[0]) return;

        try {
            setIsLoading(true);
            const newRoom = {
                title: (e.target as any).title.value,
                description: (e.target as any).description.value,
                bedCount: Number((e.target as any).bedCount.value),
                guestCount: Number((e.target as any).guestCount.value),
                bathroomCount: Number((e.target as any).bathroomCount.value),
                roomPrice: Number((e.target as any).roomPrice.value),
                freewifi: (e.target as any).freewifi.value,
                roomService: (e.target as any).roomservice.value,
                TV: (e.target as any).tv.value,
                beachView: (e.target as any).beachView.value,
                mountainView: (e.target as any).mountainView.value,
                cityView: (e.target as any).cityView.value,
                hotelId: Number(id),
                image: null,
            };
            try {
                newRoom.image = await uploadToFirebase((e.target as any).image?.files[0], null);
            } catch (err: any) {
                console.log(err);
                console.log("ảnh đã lỗi");
            }
            console.log("newHotel:=", newRoom);
            const img: any[] = [];
            for (const item of picturesPreview) {
                const imgUrl = await uploadToFirebase(item.file, null);
                img.push({ imgUrl });
            }
            const result = await api.room.create({
                newRoom,
                img
            });
            console.log("result", result);

            Modal.success({
                title: "Notification",
                content: "Bạn đã thêm sản phẩm thành công!",
                onOk: () => {
                    console.log("result.data.data", result.data);
                    (e.target as any).title.value = "";
                    (e.target as any).description.value = "";
                    (e.target as any).bedCount.value = "";
                    (e.target as any).guestCount.value = "";
                    (e.target as any).bathroomCount.value = "";
                    (e.target as any).roomPrice.value = "";
                    (e.target as any).freewifi.value = "";
                    (e.target as any).roomservice.value = "";
                    (e.target as any).tv.value = "";
                    (e.target as any).beachView.value = "";
                    (e.target as any).mountainView.value = "";
                    (e.target as any).cityView.value = "";
                    window.location.href = "/partner/pending-status";
                    setPicturesPreview([]);
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
        <div>
            <div className='new'>
                <div className='newContainer'>
                    <div className="top">
                        <h1>Add New Room</h1>
                    </div>
                    <div className="bottom">
                        <div className="right">
                            <form onSubmit={(e) => handleAddRoom(e)}>
                                <div className="left">
                                    <div className='input_avatar'>
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
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="file">Img</label>
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

                                <div className='formInput'>
                                    <label htmlFor="title">title</label>
                                    <input id="title" type="text" />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="description">description</label>
                                    <input id="description" type="text" />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="bedCount">bedCount</label>
                                    <input id="bedCount" type="text" />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="guestCount">guestCount</label>
                                    <input id="guestCount" type="text" />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="bathroomCount">bathroomCount</label>
                                    <input id="bathroomCount" type="text" />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="roomPrice">roomPrice</label>
                                    <input id="roomPrice" type="text" />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="freewifi">freewifi</label>
                                    <select id="freewifi" onChange={(e) => selectoption(e.target.value)}>
                                        <option value={StatusSelect.Yes}>Yes</option>
                                        <option value={StatusSelect.No}>No</option>
                                    </select>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="">RoomService</label>
                                    <select id="roomservice" onChange={(e) => selectoption(e.target.value)}>
                                        <option value={StatusSelect.Yes}>Yes</option>
                                        <option value={StatusSelect.No}>No</option>
                                    </select>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="">TV</label>
                                    <select id="tv" onChange={(e) => selectoption(e.target.value)}>
                                        <option value={StatusSelect.Yes}>Yes</option>
                                        <option value={StatusSelect.No}>No</option>
                                    </select>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="">BeachView</label>
                                    <select id="beachView" onChange={(e) => selectoption(e.target.value)}>
                                        <option value={StatusSelect.Yes}>Yes</option>
                                        <option value={StatusSelect.No}>No</option>
                                    </select>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="">MountainView</label>
                                    <select id="mountainView" onChange={(e) => selectoption(e.target.value)}>
                                        <option value={StatusSelect.Yes}>Yes</option>
                                        <option value={StatusSelect.No}>No</option>
                                    </select>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor="">CityView</label>
                                    <select id="cityView" onChange={(e) => selectoption(e.target.value)}>
                                        <option value={StatusSelect.Yes}>Yes</option>
                                        <option value={StatusSelect.No}>No</option>
                                    </select>
                                </div>
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
        </div>
    )
}
