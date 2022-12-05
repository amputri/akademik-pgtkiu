import React from 'react'
import { useParams } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Grafik from './pages/grafik/Grafik'
import Kelas from './pages/Kelas'
import Capaian from './pages/pencapaian/Capaian'
import Subcapaian from './pages/pencapaian/Subcapaian'
import Bidangpengembangan from './pages/penilaian/Bidangpengembangan'
import Indikator from './pages/penilaian/Indikator'
import Rapotpencapaian from './pages/rapot/Rapotpencapaian'
import Rapotpengembangan from './pages/rapot/Rapotpengembangan'
import Rapotrombel from './pages/rapot/Rapotrombel'
import Rombelkelas from './pages/rombel/Rombelkelas'
import Rombelsiswa from './pages/rombel/Rombelsiswa'
import Siswa from './pages/Siswa'

const Content = () => {
    const { isi } = useParams()

    let tampil

    if (isi === 'beranda') {
        tampil = <Beranda />
    }

    if (isi === 'kelas') {
        tampil = <Kelas />
    }

    if (isi === 'siswa') {
        tampil = <Siswa />
    }

    if (isi === 'rombelkelas') {
        tampil = <Rombelkelas />
    }

    if (isi === 'rombelsiswa') {
        tampil = <Rombelsiswa />
    }

    if (isi === 'bidangpengembangan') {
        tampil = <Bidangpengembangan />
    }

    if (isi === 'indikator') {
        tampil = <Indikator />
    }

    if (isi === 'capaian') {
        tampil = <Capaian />
    }

    if (isi === 'subcapaian') {
        tampil = <Subcapaian />
    }

    if (isi === 'rapotrombel') {
        tampil = <Rapotrombel />
    }

    if (isi === 'rapotpengembangan') {
        tampil = <Rapotpengembangan />
    }

    if (isi === 'rapotpencapaian') {
        tampil = <Rapotpencapaian />
    }

    if (isi === 'grafik') {
        tampil = <Grafik />
    }

    return (
        <>
            {tampil}
        </>
    )
}

export default Content
