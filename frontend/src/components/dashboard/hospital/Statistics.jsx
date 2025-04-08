import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line, CartesianGrid
} from 'recharts';
import './hospitaldash.css';
import { useContext, useEffect, useState } from 'react';
import { HospitalContext } from '../HospitalDashboard';
import { MdLocalHospital, MdPeople } from 'react-icons/md';

const COLORS = ['#09a', '#00c2d3'];

const Statistics = () => {
  const { hospital } = useContext(HospitalContext);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/hospital/statistics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ registrationId: hospital.registrationId })
        });

        const data = await res.json();

        setBarData(data.problemStats);
        setPieData(data.genderRatio);
        setLineData(data.dailyStats);
        setDoctorCount(data.totalDoctors);
        setPatientCount(data.totalPatients);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="doc-containers">
      <div className="doc-nav">
        <div className="doc-title">Statistics</div>
      </div>

      <div className="statistics-cards">
        <div className="card">
          <div className="card-icon"><MdLocalHospital size={28} color="#09a" /></div>
          <div className='card-values'>
            <p className="card-title">Doctors</p>
            <p className="card-value">{doctorCount}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon"><MdPeople size={28} color="#09a" /></div>
          <div className='card-values'>
            <p className="card-title">Patients</p>
            <p className="card-value">{patientCount}</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h2>Patients by Problem</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#09a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Gender Ratio</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="appointments" stroke="#09a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
