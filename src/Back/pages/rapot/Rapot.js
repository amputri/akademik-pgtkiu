import React from 'react';
import { nilaiHuruf, surah, jilid, bulan } from '../../../Axios/link';

const Rapot = React.forwardRef((props, ref) => {
  let no = 0

  return (
    <div ref={ref}>
      <table className='w-100'>
        <thead>
          <tr>
            <td>
              <div style={{ height: '40px' }}></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='mx-5' style={{ marginTop: '-25px' }}>
                <img className='w-100 h-auto' src={props.tingkat === "0" ? "https://api-pgtkiu.sihaq.com/assets/images/koppg.jpg" : "https://api-pgtkiu.sihaq.com/assets/images/koptk.jpg"} alt="kop" />
              </div>
              <div className='mx-5'>
                <div className='my-4 text-center' style={{ fontSize: '16px' }}>
                  <span className='fw-bold'>LAPORAN PERKEMBANGAN PESERTA DIDIK KELOMPOK USIA {props.tingkat === "0" ? "3-4" : props.tingkat === "2" ? "4-5" : "5-6"} TAHUN</span><br />
                  <span>TAHUN PELAJARAN {props.tapel?.tapel}</span>
                </div>
                <div className="d-flex mb-1" style={{ fontSize: '14px' }}>
                  <div style={{ width: '22%' }}>Nama Sekolah</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '45%' }} className="fw-bold">{props.tingkat === "0" ? "Play Group EL-HAQ" : "TK Islam Unggulan EL-HAQ"}</div>
                  <div style={{ width: '12%' }}></div>
                  <div style={{ width: '3%' }}></div>
                  <div style={{ width: '15%' }}></div>
                </div>
                <div className="d-flex mb-1" style={{ fontSize: '14px' }}>
                  <div style={{ width: '22%' }}>Nama Peserta Didik</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '45%' }} className="text-uppercase fw-bold">{props.detail?.nama_siswa}</div>
                  <div style={{ width: '12%' }}>Kelas</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '15%' }}>{props.namaKelas}</div>
                </div>
                <div className="d-flex mb-4" style={{ fontSize: '14px' }}>
                  <div style={{ width: '22%' }}>Nomor Induk / NISN</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '45%' }}>{props.siswa?.nis} / {props.detail?.nisn}</div>
                  <div style={{ width: '12%' }}>Semester</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '15%' }}>{props.semester === 1 ? "I (Satu)" : "II (Dua)"}</div>
                </div>
                {
                  props.bidangPengembangan?.map((val, index) => (
                    <div key={`bp` + index} style={{ fontSize: '14px' }}>
                      <div className='merge-component'>
                        <div style={{ fontWeight: 'bold' }}>{val.nomor_urut + '. Bidang Pengembangan ' + val.bidang_pengembangan}</div>
                        <table className='table table-bordered table-sm border-dark border-1'>
                          <tbody>
                            <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
                              <td style={{ width: "10%" }}>No</td>
                              <td style={{ width: "62%" }}>Kompetensi Dasar</td>
                              <td style={{ width: "7%" }}>BB</td>
                              <td style={{ width: "7%" }}>MB</td>
                              <td style={{ width: "7%" }}>BSH</td>
                              <td style={{ width: "7%" }}>BSB</td>
                            </tr>
                            {
                              props.indikator[index]?.map((val2, index2) => (
                                <tr key={`i` + index2}>
                                  <td style={{ textAlign: 'center', width: "10%" }}>{val2.nomor_indikator}</td>
                                  <td style={{ width: "62%" }}>{val2.indikator}</td>
                                  <td style={{ textAlign: 'center', width: "7%" }}>{props.nilaiPengembangan[props.nilaiPengembangan.map(item => item.idindikator).indexOf(val2.id)]?.nilai === "1" ? '✓' : ''}</td>
                                  <td style={{ textAlign: 'center', width: "7%" }}>{props.nilaiPengembangan[props.nilaiPengembangan.map(item => item.idindikator).indexOf(val2.id)]?.nilai === "2" ? '✓' : ''}</td>
                                  <td style={{ textAlign: 'center', width: "7%" }}>{props.nilaiPengembangan[props.nilaiPengembangan.map(item => item.idindikator).indexOf(val2.id)]?.nilai === "3" ? '✓' : ''}</td>
                                  <td style={{ textAlign: 'center', width: "7%" }}>{props.nilaiPengembangan[props.nilaiPengembangan.map(item => item.idindikator).indexOf(val2.id)]?.nilai === "4" ? '✓' : ''}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                      <div className='merge-component'>
                        <table className='table table-bordered table-sm border-dark border-1'>
                          <tbody>
                            <tr>
                              <td style={{ width: "20%", textAlign: 'center' }}>
                                <img src={`${props.fotoPengembangan[props.fotoPengembangan.map(item => item.idbidangpengembangan).indexOf(val.id)]?.foto}`} alt="foto" width="120" height="120" />
                              </td>
                              <td style={{ width: "80%", textAlign: 'justify' }}>{props.komentarBidang[index]}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                }
                <div style={{ fontSize: '14px' }} className='merge-component'>
                  <table width="100%" className='table-sm text-center'>
                    <tbody>
                      <tr style={{ fontWeight: 'bold' }}>
                        <td colSpan={2} width="37%" className='border-dark border-1'>Keterangan</td>
                        <td width="3%"></td>
                        <td colSpan={2} width="23%" className='border-dark border-1'>Ketidakhadiran</td>
                        <td width="3%"></td>
                        <td colSpan={2} width="34%" className='border-dark border-1'>Kesehatan Fisik</td>
                      </tr>
                      <tr>
                        <td width="7%" className='border-dark border-1'>BB</td>
                        <td width="30%" className='border-dark border-1'>Belum Berkembang</td>
                        <td width="3%"></td>
                        <td width="10%" className='border-dark border-1'>Sakit</td>
                        <td width="13%" className='border-dark border-1'>{props.absenFisik?.sakit} hari</td>
                        <td width="3%"></td>
                        <td width="20%" className='border-dark border-1'>Tinggi Badan</td>
                        <td width="14%" className='border-dark border-1'>{props.absenFisik?.tinggibadan} cm</td>
                      </tr>
                      <tr>
                        <td width="7%" className='border-dark border-1'>MB</td>
                        <td width="30%" className='border-dark border-1'>Mulai Berkembang</td>
                        <td width="3%"></td>
                        <td width="10%" className='border-dark border-1'>Izin</td>
                        <td width="13%" className='border-dark border-1'>{props.absenFisik?.izin} hari</td>
                        <td width="3%"></td>
                        <td width="20%" className='border-dark border-1'>Berat Badan</td>
                        <td width="14%" className='border-dark border-1'>{props.absenFisik?.beratbadan} kg</td>
                      </tr>
                      <tr>
                        <td width="7%" className='border-dark border-1'>BSH</td>
                        <td width="30%" className='border-dark border-1'>Berkembang Sesuai Harapan</td>
                        <td width="3%"></td>
                        <td width="10%" className='border-dark border-1'>Alpha</td>
                        <td width="13%" className='border-dark border-1'>{props.absenFisik?.alpha} hari</td>
                        <td width="3%"></td>
                        <td width="20%" className='border-dark border-1'>Lingkar Kepala</td>
                        <td width="14%" className='border-dark border-1'>{props.absenFisik?.lingkarkepala} cm</td>
                      </tr>
                      <tr>
                        <td width="7%" className='border-dark border-1'>BSB</td>
                        <td width="30%" className='border-dark border-1'>Berkembang Sangat Baik</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: '14px', marginTop: '15px' }} className='merge-component'>
                  <table width="100%" className='table table-bordered table-sm border-dark border-1'>
                    <tbody>
                      <tr>
                        <td>
                          <span>Catatan Orang Tua/Wali Murid :</span>
                          <br /><br /><br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: '14px', marginTop: '35px' }} className='merge-component'>
                  <table width="100%" className='table-sm text-center'>
                    <tbody>
                      <tr>
                        <td width="50%"></td>
                        <td width="50%">Sidoarjo, {props.tapel?.tgl_rapot1.split('-')[2]} {bulan[props.tapel?.tgl_rapot1.split('-')[1] - 1]} {props.tapel?.tgl_rapot1.split('-')[0]}</td>
                      </tr>
                      <tr>
                        <td width="50%">
                          <span>Orang Tua/Wali Murid</span>
                          <br /><br /><br />
                          <span>....................................................</span>
                        </td>
                        <td width="50%">
                          <span>Wali Kelas</span>
                          <br /><br /><br />
                          <span className='text-decoration-underline'>{props.walas}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} width="100%">
                          <span>Mengetahui</span>
                          <br />
                          <span>Kepala Sekolah</span>
                          <br /><br /><br />
                          <span className='text-decoration-underline fw-bold'>{props.kepsek}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div style={{ height: '50px' }}></div>
            </td>
          </tr>
        </tfoot>
      </table>
      <table className='w-100 new-page'>
        <thead>
          <tr>
            <td>
              <div style={{ height: '40px' }}></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='mx-5' style={{ marginTop: '-25px' }}>
                <img className='w-100 h-auto' src={props.tingkat === "0" ? "https://api-pgtkiu.sihaq.com/assets/images/koppg.jpg" : "https://api-pgtkiu.sihaq.com/assets/images/koptk.jpg"} alt="kop" />
              </div>
              <div className='mx-5'>
                <div className='my-4 text-center' style={{ fontSize: '16px' }}>
                  <span className='fw-bold'>LAPORAN PENCAPAIAN PESERTA DIDIK KELOMPOK USIA {props.tingkat === "0" ? "3-4" : props.tingkat === "2" ? "4-5" : "5-6"} TAHUN</span><br />
                  <span>TAHUN PELAJARAN {props.tapel?.tapel}</span>
                </div>
                <div className="d-flex mb-1" style={{ fontSize: '14px' }}>
                  <div style={{ width: '22%' }}>Nama Sekolah</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '45%' }} className="fw-bold">{props.tingkat === "0" ? "Play Group EL-HAQ" : "TK Islam Unggulan EL-HAQ"}</div>
                  <div style={{ width: '12%' }}></div>
                  <div style={{ width: '3%' }}></div>
                  <div style={{ width: '15%' }}></div>
                </div>
                <div className="d-flex mb-1" style={{ fontSize: '14px' }}>
                  <div style={{ width: '22%' }}>Nama Peserta Didik</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '45%' }} className="text-uppercase fw-bold">{props.detail?.nama_siswa}</div>
                  <div style={{ width: '12%' }}>Kelas</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '15%' }}>{props.namaKelas}</div>
                </div>
                <div className="d-flex mb-4" style={{ fontSize: '14px' }}>
                  <div style={{ width: '22%' }}>Nomor Induk / NISN</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '45%' }}>{props.siswa?.nis} / {props.detail?.nisn}</div>
                  <div style={{ width: '12%' }}>Semester</div>
                  <div style={{ width: '3%' }}>:</div>
                  <div style={{ width: '15%' }}>{props.semester === 1 ? "I (Satu)" : "II (Dua)"}</div>
                </div>
                {
                  props.capaian.map((val, index) => (
                    <div key={'c' + index} style={{ fontSize: '14px' }}>
                      <div className='merge-component'>
                        <span style={{ fontWeight: 'bold' }}>{val.nomor_capaian}. {val.capaian}</span>
                        <table className='table table-bordered table-sm border-dark border-1'>
                          <tbody>
                            <tr>
                              <td width="75%" style={{ fontWeight: 'bold', textAlign: 'center' }}>CAPAIAN</td>
                              <td width="25%" style={{ fontWeight: 'bold', textAlign: 'center' }}>NILAI</td>
                            </tr>
                            {
                              props.subcapaian[no++]?.map((val4, index4) => (
                                <tr key={'s' + index4}>
                                  <td width="75%">{val4.nomor_subcapaian}. {val4.subcapaian}</td>
                                  <td width="25%" style={{ textAlign: 'center' }}>{nilaiHuruf[props.nilaiCapaian[props.nilaiCapaian.map(item => item.idsubcapaian).indexOf(val4.id)]?.nilai - 1]}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                      {
                        val.sub.map((val2, index2) => (
                          <React.Fragment key={'d' + index2}>
                            <table className='table table-bordered table-sm border-dark border-1 merge-component'>
                              <tbody>
                                <tr>
                                  <td colSpan={2} style={{ fontWeight: 'bold' }}>{val2.nomor_capaian}. {val2.capaian}</td>
                                </tr>
                                {
                                  props.subcapaian[no++]?.map((val5, index5) => (
                                    <tr key={'su' + index5}>
                                      <td width="75%" className='ps-4'>{val5.nomor_subcapaian}. {val5.subcapaian}</td>
                                      <td width="25%" style={{ textAlign: 'center' }}>{nilaiHuruf[props.nilaiCapaian[props.nilaiCapaian.map(item => item.idsubcapaian).indexOf(val5.id)]?.nilai - 1]}</td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                            {
                              val2.sub.map((val3, index3) => (
                                <table key={'3' + index3} className='table table-bordered table-sm border-dark border-1 merge-component'>
                                  <tbody>
                                    <tr>
                                      <td colSpan={2} className='ps-4 border-dark border-1' style={{ fontWeight: 'bold' }}>{val3.nomor_capaian}. {val3.capaian}</td>
                                    </tr>
                                    {
                                      props.subcapaian[no++]?.map((val6, index6) => (
                                        <tr key={'sub' + index6}>
                                          <td width="75%" className='ps-5 ms-3 border-dark border-1'>{val6.nomor_subcapaian}. {val6.subcapaian}</td>
                                          <td className='border-dark border-1' width="25%" style={{ textAlign: 'center' }}>{nilaiHuruf[props.nilaiCapaian[props.nilaiCapaian.map(item => item.idsubcapaian).indexOf(val6.id)]?.nilai - 1]}</td>
                                        </tr>
                                      ))
                                    }
                                  </tbody>
                                </table>
                              ))
                            }
                          </React.Fragment>
                        ))
                      }
                    </div>
                  ))
                }
                <div style={{ fontSize: '14px' }} className='merge-component'>
                  <span style={{ fontWeight: 'bold' }}>PROGRAM UNGGULAN</span>
                  <table className='table table-bordered table-sm border-dark border-1'>
                    <tbody>
                      <tr>
                        <td width="35%" style={{ fontWeight: 'bold', textAlign: 'center' }}>PROGRAM</td>
                        <td width="35%" style={{ fontWeight: 'bold', textAlign: 'center' }}>CAPAIN</td>
                        <td width="25%" style={{ fontWeight: 'bold', textAlign: 'center' }}>NILAI</td>
                      </tr>
                      <tr>
                        <td width="35%">1. Tahfidz</td>
                        <td width="35%" style={{ textAlign: 'center' }}>Surah {surah[props.capaianMengaji?.surah]}</td>
                        <td width="25%" style={{ textAlign: 'center' }}>{nilaiHuruf[props.capaianMengaji?.nilaitahfidz - 1]}</td>
                      </tr>
                      <tr>
                        <td width="35%">2. Ummi</td>
                        <td width="40%" style={{ textAlign: 'center' }}>{jilid[props.capaianMengaji?.jilid]}</td>
                        <td width="25%" style={{ textAlign: 'center' }}>{nilaiHuruf[props.capaianMengaji?.nilaiummi - 1]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div style={{ height: '50px' }}></div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className='position-fixed top-50 start-50 translate-middle' style={{ padding: '300px 110px' }}>
        <img className='opacity-25' width="500" src={props.tingkat === "0" ? "https://api-pgtkiu.sihaq.com/assets/images/watermarkpg.png" : "https://api-pgtkiu.sihaq.com/assets/images/watermarktk.png"} alt="watermark" />
      </div>
      <div className='position-fixed bottom-0 end-0 mb-4 me-5' style={{ fontSize: '10px' }}>Rapot Smt {props.semester} / {props.tapel?.tapel} / {props.namaKelas} / {props.detail?.nama_siswa.toUpperCase()} / ({props.siswa?.nis})</div>
    </div>
  )
})

export default Rapot