import React, { useState, useEffect } from 'react'
import { link, linkYPS, surah, jilid, nilaiHuruf } from '../../../Axios/link'
import DataTable from "react-data-table-component"
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css"

const UmmiTahfidz = (props) => {
    const [ngaji, setNgaji] = useState([])
    const [siswa, setSiswa] = useState([])
    const [data, setData] = useState([])

    const columns = [
        {
            name: "No",
            selector: "no",
            sortable: true
        },
        {
            name: "Kelas",
            selector: "kelas",
            sortable: true
        },
        {
            name: "Siswa",
            selector: "nama_siswa",
            sortable: true
        },
        {
            name: "Surah",
            selector: "surat",
            sortable: true
        },
        {
            name: "Nilai Tahfidz",
            selector: "tahfidz",
            sortable: true
        },
        {
            name: "Jilid",
            selector: "jilidd",
            sortable: true
        },
        {
            name: "Nilai Ummi",
            selector: "ummi",
            sortable: true
        },
    ]

    useEffect(() => {
        getNgaji() // eslint-disable-next-line
    }, [props.idtapel, props.semester])

    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [ngaji, siswa])

    async function getNgaji() {
        const res = await link.get(`Capaianummitahfidz/rekap/${props.semester}/${props.idtapel}`)
        setNgaji(res.data)
        getSiswaWithDetail(res.data)
    }

    async function getDetailSiswa(idSiswa) {
        const res = await linkYPS.get(`Siswa/detail/${idSiswa}`)
        return res.data
    }

    async function getSiswaWithDetail(siswa) {
        const withDetail = await Promise.all(siswa.map(siswa => getDetailSiswa(siswa.ref_siswa)))
        setSiswa(withDetail)
    }

    function setIsiTabel() {
        let nomor = 1
        const dataSementara = ngaji.map((val, index) => ({
            no: nomor++,
            kelas: val.nama_kelas,
            nama_siswa: siswa[index]?.nama_siswa,
            surat: surah[val.surah],
            tahfidz: nilaiHuruf[val.nilaitahfidz - 1],
            jilidd: jilid[val.jilid],
            ummi: nilaiHuruf[val.nilaiummi - 1],
        }))
        setData(dataSementara)
    }

    return (
        <div>
            <div className="row">
                <h5>Tabel Capaian Mengaji</h5>
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

export default UmmiTahfidz
