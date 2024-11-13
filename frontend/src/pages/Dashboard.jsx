// frontend/src/pages/Dashboard.jsx

import { useState, useEffect } from 'react';
import { Card, Title, AreaChart, DonutChart } from '@tremor/react';
import { CalendarIcon, CurrencyDollarIcon, ArchiveBoxIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import axiosClient from '../config/axios';

export default function Dashboard() {

    const [stats, setStats] = useState({
        ventasHoy: 0,
        ventasSemana: 0,
        totalInventario: 0,
        stockBajo: 0,

        ventasPorDia: [],
        ventasPorCategoria: []
    });

    useEffect(() => {

        const fetchStats = async () => {

            try {
                const { data } = await axiosClient.get('/repuestos/stats');
                setStats(data);
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
            }
        };

        fetchStats();
    }, []);

    const StatsCard = ({ title, value, icon: Icon, color }) => (
        <Card decoration="top" decorationColor={color} className="relative overflow-hidden">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold mt-2">{value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${color}-100`}>
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                </div>
            </div>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Resumen general del negocio
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Ventas Hoy"
                    value={`$${stats.ventasHoy.toLocaleString()}`}
                    icon={CurrencyDollarIcon}
                    color="green"
                />
                <StatsCard
                    title="Ventas Semanales"
                    value={`$${stats.ventasSemana.toLocaleString()}`}
                    icon={CalendarIcon}
                    color="blue"
                />
                <StatsCard
                    title="Total Inventario"
                    value={stats.totalInventario}
                    icon={ArchiveBoxIcon}
                    color="indigo"
                />
                <StatsCard
                    title="Productos Stock Bajo"
                    value={stats.stockBajo}
                    icon={ExclamationTriangleIcon}
                    color="red"
                />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Card>
                    <Title>Ventas por Día</Title>
                    <AreaChart
                        className="mt-4 h-72"
                        data={stats.ventasPorDia}
                        index="fecha"
                        categories={["ventas"]}
                        colors={["blue"]}
                    />
                </Card>

                <Card>
                    <Title>Ventas por Categoría</Title>
                    <DonutChart
                        className="mt-4 h-72"
                        data={stats.ventasPorCategoria}
                        category="valor"
                        index="categoria"
                        colors={["blue", "cyan", "indigo", "violet", "rose"]}
                    />
                </Card>

            </div>
        </div>
    );
}
