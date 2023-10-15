import React, { useCallback, useEffect, useState } from "react";
import {useTelegram} from "../../Hooks/useTelegram";
import "./Form.css";


const Form = () => {
    const [couch, setCouch] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const tg = useTelegram();

    console.log("tg", tg);
    console.log("date", date);
    console.log("time", time);

    const onSendData = useCallback(() => {
        const data = {
            couch,
            date,
            time
        }
        Telegram.WebApp.sendData(JSON.stringify(data));
    }, [])

    useEffect(() => {
        console.log("@@", Telegram.WebApp);
        Telegram.WebApp.onEvent('mainButtonClicked', onSendData);
        return () => {
            Telegram.WebApp.onEvent('mainButtonClicked', onSendData)

        }
    }, [])


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

    return (
        <div className="form">
            <h3 className="form-title">Введите ваши данные</h3>
            <select className="select" value={couch} onChange={onChangeCouch}>
                <option className="option">Тренер 1</option>
                <option className="option">Тренер 2</option>
                <option className="option">Тренер 3</option>
                <option className="option">Тренер 4</option>
                <option className="option">Тренер 5</option>
            </select>
            <input className="input" type="text" placeholder="Дата" value={date} onChange={onChangeDate} />
            <input className="input" type="number" placeholder="Количество минут" value={time} onChange={onChangeTime} />
        </div>
    );
};

export default Form;