// frontend/src/pages/Dashboard.jsx

import { useState, useEffect } from 'react';
import { Card, Title, AreaChart, DonutChart, BarList } from '@tremor/react';
import {
    CurrencyDollarIcon,

    ArchiveBoxIcon,
    ExclamationTriangleIcon,
    ChartPieIcon
} from '@heroicons/react/24/outline';
import axiosClient from '../config/axios';

export default function Dashboard() {
    const [stats, setStats] = useState({

        totalRepuestos: 0,
        repuestosBajoStock: 0,
        valorInventario: 0,
        repuestosMasVendidos: [],
        ventasPorCategoria: [],
        repuestosPorCategoria: []
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosClient.get('/repuestos/stats');
                setStats(data);
            } catch (error) {
                console.error('Error al cargar estadísticas:', error);
            } finally {

                setLoading(false);

            }
        };

        fetchStats();
    }, []);


    const StatsCard = ({ title, value, icon: Icon, color }) => (
        <Card decoration="top" decorationColor={color}>
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
                    Resumen general del inventario y ventas
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Repuestos"
                    value={stats.totalRepuestos}
                    icon={ArchiveBoxIcon}
                    color="blue"
                />
                <StatsCard
                    title="Repuestos Stock Bajo"
                    value={stats.repuestosBajoStock}
                    icon={ExclamationTriangleIcon}
                    color="red"

                />
                <StatsCard
                    title="Valor del Inventario"
                    value={`$${stats.valorInventario.toLocaleString()}`}
                    icon={CurrencyDollarIcon}
                    color="green"
                />
                <StatsCard
                    title="Categorías"

                    value={stats.repuestosPorCategoria.length}
                    icon={ChartPieIcon}
                    color="purple"
                />
            </div>


            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <Card>
                    <Title>Repuestos Más Vendidos</Title>

                    <BarList
                        data={stats.repuestosMasVendidos.map(item => ({
                            name: item.nombre,
                            value: item.totalVendido
                        }))}
                        className="mt-4"
                    />
                </Card>

                <Card>
                    <Title>Ventas por Categoría</Title>
                    <DonutChart
                        className="mt-4 h-48"
                        data={stats.ventasPorCategoria}
                        category="total"
                        index="categoria"

                        valueFormatter={(value) => `$${value.toLocaleString()}`}
                        colors={["indigo", "violet", "rose", "cyan", "amber"]}
                    />

                </Card>
            </div>

            <div className="grid grid-cols-1">
                <Card>
                    <Title>Distribución de Repuestos por Categoría</Title>
                    <BarList
                        data={stats.repuestosPorCategoria.map(item => ({
                            name: item.categoria,
                            value: item.cantidad
                        }))}
                        className="mt-4"
                    />
                </Card>
            </div>
        </div>
    );
}
