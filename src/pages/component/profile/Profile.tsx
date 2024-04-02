import React, { useEffect, useState } from 'react';
import Footer from '../../footer/Footer';
import Navbar from '../../navbar/Navbar';
import { Spinner } from 'react-bootstrap';
import { randomId } from '@mieuteacher/meomeojs';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToFirebase } from '../../../service/firebase';
import { Header } from '../../header/Header';
import "./profile.scss"
import { StoreType } from '../../../store';
import { api } from '../../../service/apis';
import { Modal } from 'antd';
import { userAction } from '../../../store/slices/user.slice';
interface uploadToFirebase {
    file: any;
    fallBackUrl: any;
}
interface PicturePreview {
    url: string;
    file: File;
}
export default function Profile() {
    const dispatch = useDispatch();
    const userStore = useSelector((store: StoreType) => store.userStore)

    const [picturesPreview, setPicturesPreview] = useState<PicturePreview[]>([]);
    const userId = userStore.data.id;
    const [currentUser, setCurrentUser] = useState(null)
    console.log("currenUser", currentUser);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        gioitinh: '',
        DayBrith: '',
        cccd: '',
        Phone: '',
        avatar: '',
        imgcitizen: ''
    });
    console.log("formdata:", formData);
    useEffect(() => {
        try {
            api.authen.getUserById(userId)
                .then(async (res) => {
                    setCurrentUser(res.data.data)
                    // console.log("newdatauser", res.data.data);
                    // dispatch(userAction.setDataUserUp(res.data.data))
                    console.log(1);
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {

        }
    }, [])
    useEffect(() => {
        // Cập nhật state formData khi dữ liệu user thay đổi
        setFormData({
            userName: currentUser?.userName,
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            email: currentUser?.email,
            gioitinh: currentUser?.gioitinh,
            DayBrith: currentUser?.DayBrith,
            cccd: currentUser?.cccd,
            Phone: currentUser?.Phone,
            avatar: currentUser?.avatar,
            imgcitizen: currentUser?.imgcitizen,


        });

    }, [currentUser]);
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (typeof name === 'string') {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    async function handleUpdateUser(e: React.FormEvent) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const id = userStore.data.id;
            const avatarInput = (e.target as any).avatar;
            const citizenInput = (e.target as any).imgcitizen;

            // Kiểm tra xem người dùng đã chọn hình ảnh avatar mới hay không
            const isAvatarSelected = avatarInput.files[0] !== undefined;
            // Kiểm tra xem người dùng đã chọn hình ảnh công dân mới hay không
            const isCitizenSelected = citizenInput.files[0] !== undefined;

            // Tạo biến để lưu URL mới của hình ảnh
            let newAvatarUrl = '';
            let newCitizenUrl = '';

            // Nếu có hình ảnh mới của avatar được chọn, tải lên và lưu URL mới
            if (isAvatarSelected) {
                newAvatarUrl = await uploadToFirebase(avatarInput.files[0], null);
            }

            // Nếu có hình ảnh mới của công dân được chọn, tải lên và lưu URL mới
            if (isCitizenSelected) {
                newCitizenUrl = await uploadToFirebase(citizenInput.files[0], null);
            }

            // Cập nhật dữ liệu mới trong formData
            const updatedFormData = {
                ...formData,
                avatar: isAvatarSelected ? newAvatarUrl : formData.avatar,
                imgcitizen: isCitizenSelected ? newCitizenUrl : formData.imgcitizen,
            };

            // Gửi yêu cầu cập nhật thông tin qua API
            let res = await api.authen.update(id, updatedFormData);
            console.log("resprofile", res);

            Modal.success({
                title: "Notification",
                content: "Bạn đã cập nhật hình ảnh thành công!",
                onOk: () => {
                    console.log("result.data.data", res);
                    dispatch(userAction.update(res.data.data));
                    setIsLoading(false);
                }
            });
            alert('Thông tin cá nhân đã được cập nhật thành công!');
        } catch (error) {
            setIsLoading(false)
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
            alert('Đã xảy ra lỗi khi cập nhật thông tin người dùng. Vui lòng thử lại sau!');
        }
    }

    // async function handleUpdateCitizen(e: React.FormEvent) {
    //     console.log("co vao day ko");
    //     e.preventDefault();
    //     if (!(e.target as any).image.files[0]) return;
    //     console.log("123");

    //     try {
    //         setIsLoading(true);
    //         const updatedataciziten = {
    //             userName: (e.target as any).userName.value,
    //             firstName: (e.target as any).firstName.value,
    //             lastName: (e.target as any).lastName.value,
    //             email: (e.target as any).Email.value,
    //             gioitinh: (e.target as any).gioitinh.value,
    //             DayBrith: (e.target as any).DayBrith.value,
    //             cccd: (e.target as any).cccd.value,
    //             Phone: (e.target as any).Phone.value,
    //         }
    //         console.log("handleUpdateCitizen", updatedataciziten);


    //         const imgcitizen: any[] = [];
    //         for (const item of picturesPreview) {
    //             const url = await uploadToFirebase(item.file, null);
    //             imgcitizen.push({ url });
    //         }
    //         const result = await api.authen.updateimg(userStore.data.id, {
    //             imgcitizen
    //         });
    //         console.log("result", result);

    //         Modal.success({
    //             title: "Notification",
    //             content: "Bạn đã thêm sản phẩm thành công!",
    //             onOk: () => {
    //                 console.log("result.data.data", result.data);
    //                 // dispatch(roomAction.addData(result.data))
    //                 // dispatch(hotelAction.addData(result.data.data));
    //                 setPicturesPreview([]);
    //                 setIsLoading(false);
    //             }
    //         });
    //     } catch (err: any) {
    //         console.log(err);
    //         alert("lỗi gì đó");
    //         setIsLoading(false);
    //     }
    // }
    return (
        <>
            <div className='box-nav'>
                <Navbar></Navbar>
            </div>
            <div className='new'>
                <div className='newContainer'>
                    <div className='top'>
                        <h1>Profile User</h1>
                    </div>
                    <div className='bottom'>
                        <div className='right'>
                            <form onSubmit={(e) => { handleUpdateUser(e) }}>
                                <div className='left'>
                                    <div className='input_avatar'>
                                        <img src={currentUser?.avatar} alt='image' />
                                        <input
                                            onChange={(e) => {
                                                if (e.target.files.length > 0) {
                                                    const spanEl = e.target.parentNode.querySelector('span');
                                                    const imgEl = e.target.parentNode.querySelector('img');
                                                    spanEl.style.opacity = '0';
                                                    imgEl.src = URL.createObjectURL(e.target.files[0]);
                                                }
                                            }}
                                            name='avatar'
                                            type='file'
                                        />
                                        <span>+</span>
                                    </div>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='userName'>Name</label>
                                    <input id='userName' type='text' name='userName' value={formData?.userName} onChange={handleInputChange} />
                                </div>
                                <div className='formInput form-id'>
                                    <label htmlFor='id'>ID:</label>
                                    <h1 className='id'>BK-132024{userStore.data.id}</h1>
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='firstName'>FirstName</label>
                                    <input id='firstName' type='text' name='firstName' value={formData?.firstName} onChange={handleInputChange} />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='lastName'>lastName</label>
                                    <input id='lastName' type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='Email'>Email <span>{currentUser?.emailConfirm}</span></label>
                                    <input id='Email' type='text' name='Email' value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='gioitinh'>AGES</label>
                                    <input id='gioitinh' type='text' name='gioitinh' value={formData.gioitinh} onChange={handleInputChange} />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='title'>Date of Birth</label>
                                    <input id='DayBrith' type='text' name='DayBrith' value={formData.DayBrith} onChange={handleInputChange} />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='cccd'>CCCD-Status:{currentUser?.statusImg}</label>
                                    <input id='cccd' type='text' name='cccd' value={formData.cccd} onChange={handleInputChange} />
                                </div>
                                <div className='formInput'>
                                    <label htmlFor='Phone'>Phone</label>
                                    <input id='Phone' type='text' name='Phone' value={formData.Phone} onChange={handleInputChange} />
                                </div>
                                <div className='input_citizen'>
                                    <img src={currentUser?.imgcitizen} alt="" />
                                    <input
                                        onChange={(e) => {
                                            if (e.target.files.length > 0) {
                                                const spanEl = e.target.parentNode.querySelector('span');
                                                const imgEl = e.target.parentNode.querySelector('img');
                                                spanEl.style.opacity = '0';
                                                imgEl.src = URL.createObjectURL(e.target.files[0]);
                                            }
                                        }}
                                        name='imgcitizen'
                                        type='file'
                                        disabled={currentUser?.statusImg == "active"} // Disable nếu imgcitizen.status là 'active'
                                    />
                                    <span>+</span>
                                </div>

                                <button type='submit' className='btn-update' disabled={isLoading}>
                                    {isLoading ? (
                                        <Spinner className='loading' animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : (
                                        'Update'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}
