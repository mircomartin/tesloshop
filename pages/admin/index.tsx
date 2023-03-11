import { DashboardOutlined } from '@mui/icons-material';
import { NextPage } from 'next';

import { AdminLayout } from '../../components/layouts'

const DashboardPage:NextPage = () => {
  return (
	<AdminLayout
		title='Dashboard'
		subTitle='Estadisticás Generales'
		icon={<DashboardOutlined/>}
	>
		<h3>Hola mundo</h3>
	</AdminLayout>
  )
}

export default DashboardPage;