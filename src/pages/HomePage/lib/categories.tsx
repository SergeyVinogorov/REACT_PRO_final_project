import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import * as React from 'react';
import { Category } from '../types';

export const categories: Category[] = [
	{ label: 'Наборы', icon: <Inventory2OutlinedIcon fontSize='small' /> },
	{ label: 'Лакомства', icon: <PetsOutlinedIcon fontSize='small' /> },
	{ label: 'Аксессуары', icon: <LocalOfferOutlinedIcon fontSize='small' /> },
	{ label: 'Игрушки', icon: <SportsBaseballOutlinedIcon fontSize='small' /> },
	{ label: 'Рога', icon: <ParkOutlinedIcon fontSize='small' /> },
	{ label: 'Масла', icon: <WaterDropOutlinedIcon fontSize='small' /> },
];
