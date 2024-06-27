// TimeZoneConverter.js
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimeZoneConverter = () => {
  const [gmtTime, setGmtTime] = useState('');
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    // Get current GMT time
    const gmtNow = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    // Convert GMT to IST
    const istNow = moment.tz(gmtNow, 'GMT').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    setGmtTime(gmtNow);
    setIstTime(istNow);
  }, []);

  return (
    <div>
      <h2>Time Zone Converter</h2>
      <p>GMT Time: {gmtTime}</p>
      <p>IST Time: {istTime}</p>
    </div>
  );
};

export default TimeZoneConverter;
