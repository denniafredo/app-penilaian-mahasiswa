import React, { useState } from 'react';

const App = () => {
  const jumlahMahasiswa = 10;
  const jumlahAspek = 4;

  const initialState = Array.from({ length: jumlahMahasiswa }, () =>
    Array.from({ length: jumlahAspek }, () => 1)
  );

  const [nilai, setNilai] = useState(initialState);
  const [hasil, setHasil] = useState(null);

  const handleChange = (mahasiswaIndex, aspekIndex, value) => {
    setNilai(prev => {
      const newNilai = [...prev];
      newNilai[mahasiswaIndex][aspekIndex] = Number(value);
      return newNilai;
    });
  };

  const handleSubmit = () => {
    const data = {};

    for (let aspek = 0; aspek < 4; aspek++) {
      const aspekKey = `aspek_penilaian_${aspek + 1}`;
      data[aspekKey] = {};

      for (let mhs = 0; mhs < 10; mhs++) {
        data[aspekKey][`mahasiswa_${mhs + 1}`] = nilai[mhs][aspek];
      }
    }

    setHasil(data);
  };


  return (
    <div style={{ padding: '20px' }}>
      <h2>Aplikasi Penilaian Mahasiswa</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th></th>
            {[...Array(jumlahAspek)].map((_, i) => (
              <th key={i}>Aspek penilaian {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(jumlahMahasiswa)].map((_, mIndex) => (
            <tr key={mIndex}>
              <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="avatar"
                  width="24"
                  height="24"
                />
                <span>Mahasiswa {mIndex + 1}</span>
              </div></td>
              {[...Array(jumlahAspek)].map((_, aIndex) => (
                <td key={aIndex}>
                  <select
                    value={nilai[mIndex][aIndex]}
                    onChange={e =>
                      handleChange(mIndex, aIndex, e.target.value)
                    }
                    style={{ width: '100%' }} // atau bisa juga pakai '4ch'
                  >
                    {[...Array(10)].map((_, n) => (
                      <option key={n} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit} style={{ marginTop: '20px', backgroundColor: 'black', color: 'white', float: 'right' }}>
        Simpan
      </button>

      <div style={{ padding: '20px' }}>
        {hasil && (
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(hasil, null, 2)}
          </pre>
        )}
      </div>

    </div>
  );
};

export default App;
