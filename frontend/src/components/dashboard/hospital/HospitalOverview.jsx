import { useContext } from 'react';
import { HospitalContext } from '../HospitalDashboard';
import './hospitaldash.css';
import { FaUserMd, FaProcedures, FaCalendarCheck, FaBell, FaChartLine, FaEnvelope } from 'react-icons/fa';

const Overview = () => {
  const { hospital } = useContext(HospitalContext);

  const totalDoctors = hospital?.doctors?.length || 0;
  const totalPatients = hospital?.patients?.length || 0;
  const totalAppointments = hospital?.appointments?.length || 0;
  const newRequests = hospital?.newRequestedAppointments?.length || 0;
  const avgAppointments = totalPatients > 0 ? (totalAppointments / totalPatients).toFixed(2) : '0';
  const registrationDate = new Date(hospital.registrationDate).toLocaleDateString();

  const cards = [
    { label: 'Doctors', value: totalDoctors, icon: <FaUserMd /> },
    { label: 'Patients', value: totalPatients, icon: <FaProcedures /> },
    { label: 'Appointments', value: totalAppointments, icon: <FaCalendarCheck /> },
    { label: 'New Requests', value: newRequests, icon: <FaBell /> },
    { label: 'Avg. Appointments/Patient', value: avgAppointments, icon: <FaChartLine /> },
    { label: 'Contact', value: `${hospital.email} | ${hospital.phone}`, icon: <FaEnvelope />, large: true },
  ];

  return (
    <div className="doc-containers">
      <div className="doc-nav">
        <div className='doc-title'>{hospital.name}</div>
        <p>Hospital ID: <strong>{hospital.registrationId}</strong></p>
        <p>Registered on <strong>{registrationDate}</strong></p>
      </div>

      <div className="overview-grid">
        {cards.map((card, i) => (
          <div className={`overview-card ${card.large ? 'wide' : ''}`} key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="icon">{card.icon}</div>
            <div className="text">
              <h3>{card.label}</h3>
              <p>{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
