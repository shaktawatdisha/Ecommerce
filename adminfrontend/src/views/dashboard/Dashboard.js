import React from 'react'
import {
  CCol,
  CRow,
  CWidgetStatsC,
} from '@coreui/react'
import {
  cilChartPie,
  cilUser,
  cilSpeech,
  cilPeople,
  cilUserFollow,
  cilBasket,
  cilSpeedometer,
  cilAccountLogout,

} from '@coreui/icons'

import CIcon from '@coreui/icons-react'

const Dashboard = () => {
  return (


<CRow xs={{ gutter: 4 }}>
<CCol xs={6} lg={4} xxl={2}>
  <CWidgetStatsC
    color="info"
    icon={<CIcon icon={cilPeople} height={36} />}
    value="87.500"
    title="Visitors"
    inverse
    progress={{ value: 75 }}
  />
</CCol>
<CCol xs={6} lg={4} xxl={2}>
  <CWidgetStatsC
    color="success"
    icon={<CIcon icon={cilUserFollow} height={36} />}
    value="385"
    title="New Clients"
    inverse
    progress={{ value: 75 }}
  />
</CCol>
<CCol xs={6} lg={4} xxl={2}>
  <CWidgetStatsC
    color="warning"
    icon={<CIcon icon={cilBasket} height={36} />}
    value="1238"
    title="Products sold"
    inverse
    progress={{ value: 75 }}
  />
</CCol>
<CCol xs={6} lg={4} xxl={2}>
  <CWidgetStatsC
    color="primary"
    icon={<CIcon icon={cilChartPie} height={36} />}
    value="28%"
    title="Returning Visitors"
    inverse
    progress={{ value: 75 }}
  />
</CCol>
<CCol xs={6} lg={4} xxl={2}>
  <CWidgetStatsC
    color="danger"
    icon={<CIcon icon={cilSpeedometer} height={36} />}
    value="5:34:11"
    title="Avg. Time"
    inverse
    progress={{ value: 75 }}
  />
</CCol>
<CCol xs={6} lg={4} xxl={2}>
  <CWidgetStatsC
    color="info"
    icon={<CIcon icon={cilAccountLogout} height={36} />}
    value="972"
    title="Comments"
    inverse
    progress={{ value: 75 }}
  />
</CCol>
</CRow>
  )
}

export default Dashboard
