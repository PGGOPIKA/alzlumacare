import React, { useState, useEffect } from 'react';
import medicareBg from './assets/medicare.png';
import './Medicare.css';

export default function Medicare() {
  const [medications, setMedications] = useState([{ name: '', dose: '', time: '' }]);
  const [foodHydration, setFoodHydration] = useState([{ foodTime: '', hydrationTime: '' }]);
  const [consultations, setConsultations] = useState([{ hospital: '', doctor: '', date: '', time: '' }]);

  const [medMsg, setMedMsg] = useState('');
  const [foodMsg, setFoodMsg] = useState('');
  const [hydrationMsg, setHydrationMsg] = useState('');
  const [consultMsg, setConsultMsg] = useState('');

  const toDateToday = (hhmm) => {
    if (!hhmm) return null;
    const [h, m] = hhmm.split(':').map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  };

  const sameMinute = (a, b) =>
    a && b && a.getHours() === b.getHours() && a.getMinutes() === b.getMinutes();

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();

      // Medication reminders
      medications.forEach(({ name, dose, time }, index) => {
        const target = toDateToday(time);
        if (name && dose && time && sameMinute(now, target)) {
          setMedMsg(`Time to take your medication: ${name} (${dose} mg) at ${time}`);
          setMedications((meds) => {
            const newMeds = [...meds];
            newMeds.splice(index, 1);
            return newMeds.length ? newMeds : [{ name: '', dose: '', time: '' }];
          });
        }
      });

      // Food & Hydration reminders
      foodHydration.forEach(({ foodTime, hydrationTime }) => {
        const foodTarget = toDateToday(foodTime);
        const hydrationTarget = toDateToday(hydrationTime);

        if (foodTime && sameMinute(now, foodTarget)) {
          setFoodMsg(`It's time for food at ${foodTime}`);
          setFoodHydration((fh) =>
            fh.map((item) =>
              item.foodTime === foodTime ? { ...item, foodTime: '' } : item
            )
          );
        }

        if (hydrationTime && sameMinute(now, hydrationTarget)) {
          setHydrationMsg(`It's time for hydration at ${hydrationTime}`);
          setFoodHydration((fh) =>
            fh.map((item) =>
              item.hydrationTime === hydrationTime ? { ...item, hydrationTime: '' } : item
            )
          );
        }
      });

      // Doctor consultation reminder
      consultations.forEach(({ hospital, doctor, date, time }, index) => {
        if (date && time) {
          const consultDateTime = new Date(`${date}T${time}:00`);
          const warnTime = new Date(consultDateTime.getTime() - 60 * 60 * 1000);
          if (sameMinute(now, warnTime) && hospital && doctor) {
            setConsultMsg(`Doctor consultation with Dr. ${doctor} at ${hospital} in 1 hour!`);
            setConsultations((cons) => {
              const newCons = [...cons];
              newCons.splice(index, 1);
              return newCons.length ? newCons : [{ hospital: '', doctor: '', date: '', time: '' }];
            });
          }
        }
      });
    }, 5000);

    return () => clearInterval(id);
  }, [medications, foodHydration, consultations]);

  // --- Handlers ---
  const updateMedication = (index, field, value) => {
    const newMeds = [...medications];
    newMeds[index][field] = value;
    setMedications(newMeds);
  };
  const addMedication = () => setMedications([...medications, { name: '', dose: '', time: '' }]);
  const removeMedication = (index) => {
    const newMeds = [...medications];
    newMeds.splice(index, 1);
    setMedications(newMeds.length ? newMeds : [{ name: '', dose: '', time: '' }]);
  };

  const updateFoodHydration = (index, field, value) => {
    const newFH = [...foodHydration];
    newFH[index][field] = value;
    setFoodHydration(newFH);
  };
  const addFoodHydration = () => setFoodHydration([...foodHydration, { foodTime: '', hydrationTime: '' }]);
  const removeFoodHydration = (index) => {
    const newFH = [...foodHydration];
    newFH.splice(index, 1);
    setFoodHydration(newFH.length ? newFH : [{ foodTime: '', hydrationTime: '' }]);
  };

  const updateConsultation = (index, field, value) => {
    const newCons = [...consultations];
    newCons[index][field] = value;
    setConsultations(newCons);
  };
  const addConsultation = () => setConsultations([...consultations, { hospital: '', doctor: '', date: '', time: '' }]);
  const removeConsultation = (index) => {
    const newCons = [...consultations];
    newCons.splice(index, 1);
    setConsultations(newCons.length ? newCons : [{ hospital: '', doctor: '', date: '', time: '' }]);
  };

  return (
    <div className="medicare-container" style={{ backgroundImage: `url(${medicareBg})` }}>
      <div className="medicare-overlay">
        <h1 className="medicare-title">MEDICARE</h1>

        {/* Medication Reminder */}
        <section className="reminder-section">
          <h2>Medication Reminder</h2>
          {medications.map((med, i) => (
            <div key={i} className="medication-entry">
              <input type="text" placeholder="Medicine Name" value={med.name} onChange={(e) => updateMedication(i, 'name', e.target.value)} />
              <input type="number" placeholder="Dose (mg)" value={med.dose} onChange={(e) => updateMedication(i, 'dose', e.target.value)} min="0" />
              <input type="time" value={med.time} onChange={(e) => updateMedication(i, 'time', e.target.value)} />
              <button onClick={() => removeMedication(i)}>Remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={addMedication}>+ Add Medicine</button>
        </section>

        {/* Food & Hydration Reminder */}
        <section className="reminder-section">
          <h2>Food and Hydration Reminder</h2>
          {foodHydration.map((fh, i) => (
            <div key={i} className="food-hydration-entry">
              <label>
                Food Time:
                <input type="time" value={fh.foodTime} onChange={(e) => updateFoodHydration(i, 'foodTime', e.target.value)} />
              </label>
              <label>
                Hydration Time:
                <input type="time" value={fh.hydrationTime} onChange={(e) => updateFoodHydration(i, 'hydrationTime', e.target.value)} />
              </label>
              <button onClick={() => removeFoodHydration(i)}>Remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={addFoodHydration}>+ Add Food/Hydration Time</button>
        </section>

        {/* Doctor Consultation Reminder */}
        <section className="reminder-section">
          <h2>Doctor Consultation Reminder</h2>
          {consultations.map((c, i) => (
            <div key={i} className="consultation-entry">
              <input type="text" placeholder="Hospital Name" value={c.hospital} onChange={(e) => updateConsultation(i, 'hospital', e.target.value)} />
              <input type="text" placeholder="Doctor Name" value={c.doctor} onChange={(e) => updateConsultation(i, 'doctor', e.target.value)} />
              <input type="date" value={c.date} onChange={(e) => updateConsultation(i, 'date', e.target.value)} />
              <input type="time" value={c.time} onChange={(e) => updateConsultation(i, 'time', e.target.value)} />
              <button onClick={() => removeConsultation(i)}>Remove</button>
            </div>
          ))}
          <button className="add-btn" onClick={addConsultation}>+ Add Consultation</button>
        </section>

        {/* Reminder messages */}
        <div className="reminder-box">
          {medMsg && <p>{medMsg}</p>}
          {foodMsg && <p>{foodMsg}</p>}
          {hydrationMsg && <p>{hydrationMsg}</p>}
          {consultMsg && <p>{consultMsg}</p>}
        </div>
      </div>
    </div>
  );
}
