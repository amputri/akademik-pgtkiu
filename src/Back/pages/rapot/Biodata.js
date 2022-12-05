import React from 'react';
import { bulan, pekerjaan } from '../../../Axios/link';

const Biodata = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <table className='w-100'>
        <thead>
          <tr>
            <td>
              <div style={{ height: '50px' }}></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{margin: '0px 50px'}}>
                <div className="text-center fs-5 fw-bold mb-3">DATA PRIBADI PESERTA DIDIK</div>
                <br />
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>1.</div>
                  <div style={{width:'27%'}}>Nama Peserta Didik</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.nama_siswa}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>2.</div>
                  <div style={{width:'27%'}}>Nomor Induk / NISN</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}}>{props.siswa?.nis} / {props.detail?.nisn}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>3.</div>
                  <div style={{width:'27%'}}>Tempat, Tanggal Lahir</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.tempat_lahir}, {props.detail?.tanggal_lahir.split('-')[2]} {bulan[props.detail?.tanggal_lahir.split('-')[1]-1]} {props.detail?.tanggal_lahir.split('-')[0]}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>4.</div>
                  <div style={{width:'27%'}}>Jenis Kelamin</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.jenis_kelamin === "L" ? "Laki-Laki" : "Perempuan"}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>5.</div>
                  <div style={{width:'27%'}}>Agama</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">Islam</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>6.</div>
                  <div style={{width:'27%'}}>Status dalam Keluarga</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">Anak Kandung</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>7.</div>
                  <div style={{width:'27%'}}>Anak ke-</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase"></div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>8.</div>
                  <div style={{width:'27%'}}>Asal Sekolah</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.sekolah_asal}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>9.</div>
                  <div style={{width:'27%'}}>Diterima di Sekolah ini</div>
                  <div style={{width:'3%'}}></div>
                  <div style={{width:'65%'}}></div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Di Kelas</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.kelas}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Pada Tanggal</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.siswa?.tanggal_masuk.split('-')[2]} {bulan[props.siswa?.tanggal_masuk.split('-')[1]-1]} {props.siswa?.tanggal_masuk.split('-')[0]}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>10.</div>
                  <div style={{width:'27%'}}>Nama Orang Tua</div>
                  <div style={{width:'3%'}}></div>
                  <div style={{width:'65%'}}></div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Ayah</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.nama_ayah}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Ibu</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.nama_ibu}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>11.</div>
                  <div style={{width:'27%'}}>Alamat Orang Tua</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.alamat_tinggal}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Telepon / HP</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.telp_siswa} / {props.detail?.telp_alternatif_siswa}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>12.</div>
                  <div style={{width:'27%'}}>Pekerjaan Orang Tua</div>
                  <div style={{width:'3%'}}></div>
                  <div style={{width:'65%'}}></div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Ayah</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{pekerjaan[props.detail?.pekerjaan_ayah]}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Ibu</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{pekerjaan[props.detail?.pekerjaan_ibu]}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>13.</div>
                  <div style={{width:'27%'}}>Nama Wali</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{props.detail?.nama_wali}</div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>14.</div>
                  <div style={{width:'27%'}}>Alamat Wali</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}}></div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}></div>
                  <div style={{width:'27%'}}>Telepon / HP</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}}></div>
                </div>
                <div className="fs-6 d-flex mb-1">
                  <div style={{width:'5%'}}>15.</div>
                  <div style={{width:'27%'}}>Pekerjaan Wali</div>
                  <div style={{width:'3%'}}>:</div>
                  <div style={{width:'65%'}} className="text-uppercase">{pekerjaan[props.detail?.pekerjaan_wali]}</div>
                </div>
                <br />
                <div className='d-flex flex-row fs-6 mt-3 justify-content-end me-5'>
                  <div style={{width: '95px', height: '120px'}} className='border border-2 border-dark text-center me-2'>
                    <br />
                    foto<br />3x4
                  </div>
                  <div style={{height: '100px'}} className='text-center ms-4'>
                    Sidoarjo, {props.siswa?.tanggal_masuk.split('-')[2]} {bulan[props.siswa?.tanggal_masuk.split('-')[1]-1]} {props.siswa?.tanggal_masuk.split('-')[0]}
                    <br />
                    Kepala Sekolah,
                    <br /><br /><br />
                    <span className='fw-bold'>Yayuk Rahayu Ningsih, S.Pd.AUD.</span>
                  </div>
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
      <div className='position-fixed top-50 start-50 translate-middle border border-4 border-dark' style={{ padding: '300px 110px' }}>
        <img className='opacity-25' width="500" src={props.tingkat === "0" ? "https://api-pgtkiu.sihaq.com/assets/images/watermarkpg.png" : "https://api-pgtkiu.sihaq.com/assets/images/watermarktk.png"} alt="watermark" />
      </div>
    </div>
  )
})

export default Biodata