import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [mealType, setMealType] = useState('lunch'); // 'lunch' or 'dinner'

  return (
    <>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          locale="es-ES"
          className="custom-calendar"
          nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
          prevLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        />
      </div>
      <form>
      <h3>Reserva ya</h3>
      
      <div>
        <label htmlFor="">Comensales</label>
        <select name="num-comensales" id="">
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
          <option value="">6</option>
          <option value="">8</option>
          <option value="">10</option>
          <option value="">11</option>
        </select>
      </div>

      <div className="selecionar-comida-cena">
        <button
          type="button"
          className={`meal-button ${mealType === 'lunch' ? 'active' : ''}`}
          onClick={() => setMealType('lunch')}
        >
          Comer
        </button>
        <button
          type="button"
          className={`meal-button ${mealType === 'dinner' ? 'active' : ''}`}
          onClick={() => setMealType('dinner')}
        >
          Cenar
        </button>
      </div>

      <div>
        <label htmlFor="">Hora</label>
        <select name="" id="">
          <option value="10:00">10:00</option>
        </select>              
      </div>
      <input type="submit" value="Reservar" />
    </form>
    </>
    
  );
};

export default Calendario;
