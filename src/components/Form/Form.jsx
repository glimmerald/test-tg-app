import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../Hooks/useTelegram";
import "./Form.css";
import { addToDataBase } from "../../notion";


const Form = () => {
    const [couch, setCouch] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const tg = useTelegram();


    const onSendData = useCallback(() => {
        const data = {
            couch,
            date,
            time
        }
        tg.tg.sendData(JSON.stringify(data));
    }, [couch, date, time]);

    useEffect(() => {
        tg.tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData])


    useEffect(() => {
        tg.tg.MainButton.setParams({
            text: "Отправить данные"
        })
    }, [tg]);

    useEffect(() => {
        if (!date || !time) {
            tg.tg.MainButton.hide();
        } else {
            tg.tg.MainButton.show();
        }
    }, [tg, date, time]);

    const onChangeCouch = (e) => {
        setCouch(e.target.value);
    };

    const onChangeDate = (e) => {
        setDate(e.target.value);
    };

    const onChangeTime = (e) => {
        setTime(e.target.value);
    };

    console.log("{date}:", {date});



    const formSubmit = async (event) => {
        event.preventDefault();
        const myDate = document.getElementById("inputDateId").value;
        const myCouch = document.getElementById("inputCouchId").value;
        const myTime = document.getElementById("inputMinutesId").value;
        const isoDate = new Date(myDate).toISOString();
        const notionResponse = await addToDataBase({couch}, isoDate, myTime);
    }

    return (
        <form className="form" onSubmit={formSubmit}>
            <h3 className="form-title">Введите ваши данные</h3>
            <select id="inputCouchId" className="select" value={couch} onChange={onChangeCouch}>
                <option className="option">Тренер 1</option>
                <option className="option">Тренер 2</option>
                <option className="option">Тренер 3</option>
                <option className="option">Тренер 4</option>
                <option className="option">Тренер 5</option>
            </select>
            <input className="input" id="inputDateId" type="date" placeholder="Дата" value={date} onChange={onChangeDate} />
            <input className="input" id="inputMinutesId" type="number" placeholder="Количество минут" value={time} onChange={onChangeTime} />
            <input type="submit" />
        </form>
    );
};

export default Form;