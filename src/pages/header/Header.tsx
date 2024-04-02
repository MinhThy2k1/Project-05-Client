import React, { useEffect, useState } from 'react'
import "./header.scss"
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { hotelAction } from '../../store/slices/hotel.slice';
interface HeaderProps {
    type: string; // Hoặc kiểu dữ liệu chính xác của type
}
export const Header: React.FC<HeaderProps> = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const dispatch = useDispatch()
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };
    const Navigate = useNavigate()
    const handleSearch = () => {
        Navigate("/hotel", { state: { destination, dates, options } })
    }
    return (
        <div>
            <div className={
                type === "list" ? "headerContainer listMode" : "headerContainer"
            }>
                {
                    type !== "list" && <>
                        <div className='headerSearch'>
                            <div className='headerSearchItem'>
                                <i className="fa-solid fa-bed headerIcon"></i>
                                <select className='headerSearchSelect' onChange={e => setDestination(e.target.value)}>
                                    <option value="">Where are you going?</option>
                                    <option value="TP.Hồ Chí Minh">TP.Hồ Chí Minh</option>
                                    <option value="HaNoi">Hà Nội</option>
                                    <option value="VungTau">Vũng Tàu</option>
                                </select>
                            </div>
                            <div className='headerSearchItem'>
                                <i className="fa-solid fa-calendar-days"></i>
                                <span
                                    onClick={() => setOpenDate(!openDate)}
                                    className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                                        dates[0].endDate,
                                        "MM/dd/yyyy"
                                    )}`}</span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            <div className='headerSearchItem'>
                                <i className="fa-solid fa-person"></i>
                                <span
                                    onClick={() => setOpenOptions(!openOptions)}
                                    className="headerSearchText"
                                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                {openOptions && (
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.adult <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.adult}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.children <= 0}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("children", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.children}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("children", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.room <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("room", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.room}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("room", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='headerSearchItem'>
                                <button onClick={handleSearch} className='headerBtn'>Search</button>
                            </div>

                        </div>
                    </>
                }
            </div>


        </div>
    )
}
