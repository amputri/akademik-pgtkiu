import React, { useState, useEffect } from 'react'
import { link, linkYPS } from '../../../Axios/link'
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"

const AbsenFisik = (props) => {
    const [absenFisik, setAbsenFisik] = useState([])
    const [siswaAbsenFisik, setSiswaAbsenFisik] = useState([])
    const [data, setData] = useState([])

    const columns = [
        {
            name: "No",
            selector: "no_absen",
            sortable: true
        },
        {
            name: "Kelas",
            selector: "kelas_absen",
            sortable: true
        },
        {
            name: "Siswa",
            selector: "nama_siswa_absen",
            sortable: true
        },
        {
            name: "Sakit",
            selector: "sakit",
            sortable: true
        },
        {
            name: "Izin",
            selector: "izin",
            sortable: true
        },
        {
            name: "Alpha",
            selector: "alpha",
            sortable: true
        },
        {
            name: "Tinggi Badan",
            selector: "tinggi_badan",
            sortable: true
        },
        {
            name: "Berat Badan",
            selector: "berat_badan",
            sortable: true
        },
        {
            name: "Lingkar Kepala",
            selector: "lingkar_kepala",
            sortable: true
        }
    ]

    useEffect(() => {
        getAbsenFisik() // eslint-disable-next-line
    }, [props.idtapel, props.semester])

    useEffect(() => {
        setIsiTabelAbsenFisik() // eslint-disable-next-line
    }, [absenFisik, siswaAbsenFisik])

    async function getAbsenFisik() {
        const res = await link.get(`Absenfisik/rekap/${props.semester}/${props.idtapel}`)
        setAbsenFisik(res.data)
        getSiswaWithDetailAbsenFisik(res.data)
    }

    async function getDetailSiswa(idSiswa) {
        const res = await linkYPS.get(`Siswa/detail/${idSiswa}`)
        return res.data
    }

    async function getSiswaWithDetailAbsenFisik(siswa) {
        const withDetail = await Promise.all(siswa.map(siswa => getDetailSiswa(siswa.ref_siswa)))
        setSiswaAbsenFisik(withDetail)
    }

    function setIsiTabelAbsenFisik() {
        let nomor = 1
        const dataSementara = absenFisik.map((val, index) => ({
            no_absen: nomor++,
            kelas_absen: val.nama_kelas,
            nama_siswa_absen: siswaAbsenFisik[index]?.nama_siswa,
            sakit: val.sakit,
            izin: val.izin,
            alpha: val.alpha,
            tinggi_badan: val.tinggibadan,
            berat_badan: val.beratbadan,
            lingkar_kepala: val.lingkarkepala
        }))
        setData(dataSementara)
    }

    return (
        <div>
            <div className="row">
                <h5>Tabel Absen dan Kesehatan</h5>
                <DataTableExtensions {...{ columns, data }}>
                    <DataTable
                        columns={columns}
                        data={data}
                        noHeader
                        defaultSortField="no"
                        pagination
                        highlightOnHover
                    />
                </DataTableExtensions>
            </div>
        </div>
    )
}

export default AbsenFisik
