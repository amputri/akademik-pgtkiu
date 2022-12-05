import React, { useState, useEffect } from 'react'
import { linkYPS } from '../../../Axios/link'
import Select from 'react-select'
import "react-data-table-component-extensions/dist/index.css"
import Perkembangan from './Perkembangan'
import Pencapaian from './Pencapaian'
import AbsenFisik from './AbsenFisik'
import UmmiTahfidz from './UmmiTahfidz'

const Grafik = () => {
    const [tapel, setTapel] = useState([])
    const [idTapel, setIdTapel] = useState()
    const [semester, setSemester] = useState(1)

    useEffect(() => {
        getTapel()
    }, [])

    async function getTapel() {
        const res = await linkYPS.get('Tapel')
        setTapel(res.data)
        // eslint-disable-next-line
        res.data.map((value, index) => {
            const date = new Date()
            const month = date.getMonth()
            const year = date.getFullYear().toString()
            if ((month >= 0 && month <= 5 && value.tapel?.split('/')[1] === year) || (month >= 6 && month <= 11 && value.tapel?.split('/')[0] === year)) {
                setIdTapel(value.idtapel)
            }
        })
    }

    function setTapelSelect(e) {
        setIdTapel(e.value)
    }

    function setSemesterSelect(e) {
        setSemester(e.value)
    }


    return (
        <div className='p-3'>
            <div className="row">
                <h2>Rekap Nilai Siswa per Semester</h2>
            </div>
            <div className='row'>
                <span className='mb-2'>Pilih Tahun Pelajaran</span>
                <Select className='mb-3'
                    onChange={setTapelSelect.bind(this)}
                    options={
                        tapel.map(tapel => ({
                            value: tapel.idtapel, label: tapel.tapel
                        }))
                    }
                    placeholder={tapel[tapel.map(item => item.idtapel).indexOf(idTapel)]?.tapel}
                />
                <span className='mb-2'>Pilih Semester</span>
                <Select className='mb-3'
                    onChange={setSemesterSelect.bind(this)}
                    options={
                        [{ value: 1, label: 1 }, { value: 2, label: 2 }]
                    }
                    placeholder="1"
                />
            </div>
            <div>
                <ul className="nav nav-tabs mb-2" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Perkembangan</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="absen-tab" data-bs-toggle="tab" data-bs-target="#absen" type="button" role="tab" aria-controls="absen" aria-selected="false">Absen & Kesehatan</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Pencapaian</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="ngaji-tab" data-bs-toggle="tab" data-bs-target="#ngaji" type="button" role="tab" aria-controls="ngaji" aria-selected="false">Ummi & Tahfidz</button>
                    </li>
                </ul>
                <div className="tab-content px-3" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <Perkembangan idtapel={idTapel} semester={semester} />
                    </div>
                    <div className="tab-pane fade" id="absen" role="tabpanel" aria-labelledby="absen-tab">
                        <AbsenFisik idtapel={idTapel} semester={semester} />
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <Pencapaian idtapel={idTapel} semester={semester} />
                    </div>
                    <div className="tab-pane fade" id="ngaji" role="tabpanel" aria-labelledby="ngaji-tab">
                        <UmmiTahfidz idtapel={idTapel} semester={semester} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Grafik
