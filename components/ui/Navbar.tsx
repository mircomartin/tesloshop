import { useContext, useState } from 'react';

import NextLink from 'next/link';

import { useRouter } from 'next/router';

import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Input,
	InputAdornment,
	Link,
	Toolbar,
	Typography,
} from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { UIContext } from '../../context';

export const Navbar = () => {
	const { toggleSideMenu } = useContext(UIContext);

	const { pathname, push } = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		push(`/search/${searchTerm}`);
	};

	return (
		<AppBar>
			<Toolbar>
				<NextLink href="/" passHref>
					<Link display="flex" alignItems="center">
						<Typography variant="h6">Teslo |</Typography>
						<Typography sx={{ ml: 0.5 }}>Shop</Typography>
					</Link>
				</NextLink>

				<Box flex={1} />

				<Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
					<NextLink href="/category/men" passHref>
						<Link>
							<Button
								color={pathname === '/category/men' ? 'primary' : 'info'}
							>
								Hombres
							</Button>
						</Link>
					</NextLink>
					<NextLink href="/category/women" passHref>
						<Link>
							<Button
								color={
									pathname === '/category/women' ? 'primary' : 'info'
								}
							>
								Mujeres
							</Button>
						</Link>
					</NextLink>
					<NextLink href="/category/kid" passHref>
						<Link>
							<Button
								color={pathname === '/category/kid' ? 'primary' : 'info'}
							>
								Niños
							</Button>
						</Link>
					</NextLink>
				</Box>

				<Box flex={1} />

				{/* Pantalla Desktop */}

				{isSearchVisible ? (
					<Input
						sx={{ display: { xs: 'none', sm: 'flex' } }}
						className="fadeIn"
						autoFocus
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
						type="text"
						placeholder="Buscar..."
						endAdornment={
							<InputAdornment position="end">
								<IconButton onClick={() => setIsSearchVisible(false)}>
									<ClearOutlined />
								</IconButton>
							</InputAdornment>
						}
					/>
				) : (
					<IconButton
						onClick={() => setIsSearchVisible(true)}
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						<SearchOutlined />
					</IconButton>
				)}

				{/* Pantalla Mobile */}
				<IconButton
					sx={{ display: { xs: 'flex', sm: 'none' } }}
					onClick={toggleSideMenu}
				>
					<SearchOutlined />
				</IconButton>

				<NextLink href="/carrito" passHref>
					<Link>
						<IconButton>
							<Badge badgeContent={2} color="secondary">
								<ShoppingCartOutlined />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button onClick={toggleSideMenu}>Menú</Button>
			</Toolbar>
		</AppBar>
	);
};
