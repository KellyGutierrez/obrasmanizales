export interface ProjectStage {
    name: string;
    progress: number;
}

export interface Project {
    id: string;
    name: string;
    category: 'Educación' | 'Deporte' | 'Vial' | 'Salud' | 'Parques' | 'Cultura' | 'Seguridad' | 'Transporte' | 'Saneamiento';
    commune: string;
    progress: number;

    // Financial Data
    budget: number;
    executedTotal: number;
    executedCurrentPeriod: number; // 2024-2027

    // Detail Data
    contractor: string;
    dependency: string;
    jobsGenerated: number;
    builtArea: number; // m2
    publicSpaceArea: number; // m2
    interventionType: string;

    startDate: string;
    endDate: string;
    status: 'Iniciado' | 'Planeación' | 'Estudios' | 'Entregado';
    description: string;
    lat: number;
    lng: number;

    images: {
        before?: string;
        after?: string;
        render: string;
        current: string;
    };

    gantt?: { stage: string; estimatedStart: string; estimatedEnd: string; realStart?: string; realEnd?: string; progress: number }[];
    stages?: ProjectStage[];
    assignedManager?: string; // Username of the manager
}

export const projects: Project[] = [
    {
        id: '1',
        name: 'INTERCAMBIADOR VIAL LOS CEDROS',
        category: 'Vial',
        commune: 'Comuna Ciudadela del Norte',
        progress: 82,
        budget: 35000000000,
        executedTotal: 28700000000,
        executedCurrentPeriod: 28700000000,
        contractor: 'Consorcio Vial Cedros 2024',
        dependency: 'Secretaría de Infraestructura',
        jobsGenerated: 450,
        builtArea: 12500,
        publicSpaceArea: 3200,
        interventionType: 'Construcción',
        startDate: '2023-01-15',
        endDate: '2025-06-30',
        status: 'Iniciado',
        description: 'Construcción de dos puentes elevados para descongestionar el tráfico en la salida al norte de Manizales, mejorando la movilidad regional.',
        lat: 5.0845,
        lng: -75.5028,
        images: {
            render: 'https://images.unsplash.com/photo-1545143333-11b2724c9d19?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&q=80',
        },
        gantt: [
            { stage: 'Planeación', estimatedStart: '2022-10-01', estimatedEnd: '2022-12-31', realStart: '2022-10-05', realEnd: '2023-01-10', progress: 100 },
            { stage: 'Cimentación', estimatedStart: '2023-01-15', estimatedEnd: '2023-08-30', realStart: '2023-01-20', realEnd: '2023-09-15', progress: 100 },
            { stage: 'Estructura', estimatedStart: '2023-09-01', estimatedEnd: '2024-12-31', realStart: '2023-09-20', progress: 85 },
            { stage: 'Pavimentación', estimatedStart: '2025-01-01', estimatedEnd: '2025-06-30', progress: 0 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 82 }
        ]
    },
    {
        id: '2',
        name: 'CANCHA SINTÉTICA ARANJUEZ',
        category: 'Deporte',
        commune: 'Comuna Universitaria',
        progress: 100,
        budget: 2500000000,
        executedTotal: 2500000000,
        executedCurrentPeriod: 2500000000,
        contractor: 'Canchas & Espacios Mzl',
        dependency: 'Secretaría de Deporte',
        jobsGenerated: 60,
        builtArea: 4200,
        publicSpaceArea: 4200,
        interventionType: 'Mantenimiento / Modernización',
        startDate: '2023-06-10',
        endDate: '2024-01-20',
        status: 'Entregado',
        description: 'Modernización total del campo con grama sintética profesional, iluminación LED y cerramiento perimetral.',
        lat: 5.0501,
        lng: -75.4920,
        images: {
            render: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
        },
        gantt: [
            { stage: 'Terracerías', estimatedStart: '2023-06-10', estimatedEnd: '2023-07-30', progress: 100 },
            { stage: 'Filtros y Drenajes', estimatedStart: '2023-08-01', estimatedEnd: '2023-09-15', progress: 100 },
            { stage: 'Grama Sintética', estimatedStart: '2023-09-16', estimatedEnd: '2023-11-30', progress: 100 },
            { stage: 'Iluminación y Cierre', estimatedStart: '2023-12-01', estimatedEnd: '2024-01-20', progress: 100 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 100 }
        ]
    },
    {
        id: '3',
        name: 'LINEA 3 DEL CABLE AEREO',
        category: 'Transporte',
        commune: 'Comuna Palogrande',
        progress: 28,
        budget: 151200000000,
        executedTotal: 42300000000,
        executedCurrentPeriod: 42300000000,
        contractor: 'Unión Temporal Cable',
        dependency: 'Infimanizales',
        jobsGenerated: 850,
        builtArea: 18400,
        publicSpaceArea: 5200,
        interventionType: 'Construcción',
        startDate: '2024-03-01',
        endDate: '2027-04-30',
        status: 'Iniciado',
        description: 'Sistema masivo de transporte que unirá la Terminal de Transporte con las Universidades, mejorando la sostenibilidad.',
        lat: 5.0560,
        lng: -75.4850,
        images: {
            render: 'https://images.unsplash.com/photo-1494522358652-f30e63a60317?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        },
        gantt: [
            { stage: 'Estudios de Suelo', estimatedStart: '2024-03-01', estimatedEnd: '2024-05-30', progress: 100 },
            { stage: 'Pilonas Sector A', estimatedStart: '2024-06-01', estimatedEnd: '2024-12-31', progress: 45 },
            { stage: 'Estación Universidades', estimatedStart: '2025-01-01', estimatedEnd: '2025-10-30', progress: 0 },
            { stage: 'Montaje de Cables', estimatedStart: '2025-11-01', estimatedEnd: '2026-06-30', progress: 0 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 15 }
        ]
    },
    {
        id: '4',
        name: 'CENTRO INTEGRADO SAN JOSÉ',
        category: 'Educación',
        commune: 'Comuna San José',
        progress: 100,
        budget: 22000000000,
        executedTotal: 22000000000,
        executedCurrentPeriod: 12000000000,
        contractor: 'Constructora del Eje S.A.',
        dependency: 'Secretaría de Educación',
        jobsGenerated: 320,
        builtArea: 9500,
        publicSpaceArea: 4800,
        interventionType: 'Construcción',
        startDate: '2022-05-10',
        endDate: '2024-02-15',
        status: 'Entregado',
        description: 'Renovación urbana a través de un megaproyecto educativo para la población vulnerable de San José.',
        lat: 5.0683,
        lng: -75.5186,
        images: {
            render: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
        },
        gantt: [
            { stage: 'Planeación', estimatedStart: '2021-12-01', estimatedEnd: '2022-03-31', progress: 100 },
            { stage: 'Diseños', estimatedStart: '2022-04-01', estimatedEnd: '2022-05-30', progress: 100 },
            { stage: 'Cimentación', estimatedStart: '2022-06-01', estimatedEnd: '2022-12-30', progress: 100 },
            { stage: 'Estructura', estimatedStart: '2023-01-01', estimatedEnd: '2023-10-30', progress: 100 },
            { stage: 'Acabados', estimatedStart: '2023-11-01', estimatedEnd: '2024-02-15', progress: 100 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 100 }
        ]
    },
    {
        id: '5',
        name: 'MODERNIZACIÓN HOSPITAL DE LA ENEA',
        category: 'Salud',
        commune: 'Comuna Tesorito',
        progress: 65,
        budget: 12500000000,
        executedTotal: 8125000000,
        executedCurrentPeriod: 8125000000,
        contractor: 'Ingeniería Médica del Café',
        dependency: 'Secretaría de Salud',
        jobsGenerated: 180,
        builtArea: 3200,
        publicSpaceArea: 1200,
        interventionType: 'Ampliación y Dotación',
        startDate: '2024-05-20',
        endDate: '2025-08-15',
        status: 'Iniciado',
        description: 'Ampliación de la unidad de urgencias y modernización de equipos quirúrgicos para la red de salud del oriente de la ciudad.',
        lat: 5.0350,
        lng: -75.4540,
        images: {
            render: 'https://images.unsplash.com/photo-1586773860418-d319ebb274e1?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
        },
        gantt: [
            { stage: 'Procesos de Compra', estimatedStart: '2024-05-01', estimatedEnd: '2024-07-30', progress: 100 },
            { stage: 'Obra Civil Fase 1', estimatedStart: '2024-08-01', estimatedEnd: '2024-12-31', progress: 100 },
            { stage: 'Obra Civil Fase 2', estimatedStart: '2025-01-01', estimatedEnd: '2025-05-30', progress: 40 },
            { stage: 'Dotación Tecnológica', estimatedStart: '2025-06-01', estimatedEnd: '2025-08-15', progress: 0 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 65 }
        ]
    },
    {
        id: '6',
        name: 'TRANSFORMACIÓN PARQUE DE LA MUJER',
        category: 'Parques',
        commune: 'Comuna Palogrande',
        progress: 95,
        budget: 4800000000,
        executedTotal: 4560000000,
        executedCurrentPeriod: 2100000000,
        contractor: 'Paisajes Urbanos S.A.S',
        dependency: 'Secretaría de Medio Ambiente',
        jobsGenerated: 85,
        builtArea: 8400,
        publicSpaceArea: 8400,
        interventionType: 'Renovación Urbana',
        startDate: '2023-11-01',
        endDate: '2024-04-30',
        status: 'Iniciado',
        description: 'Renovación de senderos, iluminación LED y zonas recreativas temáticas en el sector de la Avenida Santander.',
        lat: 5.0640,
        lng: -75.4950,
        images: {
            render: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        },
        gantt: [
            { stage: 'Demoliciones', estimatedStart: '2023-11-01', estimatedEnd: '2023-12-15', progress: 100 },
            { stage: 'Infraestructura Eléctrica', estimatedStart: '2023-12-16', estimatedEnd: '2024-01-30', progress: 100 },
            { stage: 'Urbanismo y Senderos', estimatedStart: '2024-02-01', estimatedEnd: '2024-03-30', progress: 100 },
            { stage: 'Paisajismo y Mobiliario', estimatedStart: '2024-04-01', estimatedEnd: '2024-04-30', progress: 75 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 95 }
        ]
    },
    {
        id: '7',
        name: 'RESTAURACIÓN TEATRO FUNDADORES',
        category: 'Cultura',
        commune: 'Comuna Cumanday',
        progress: 40,
        budget: 8900000000,
        executedTotal: 3560000000,
        executedCurrentPeriod: 3560000000,
        contractor: 'Patrimonio & Arquitectura Mzl',
        dependency: 'Instituto de Cultura y Turismo',
        jobsGenerated: 120,
        builtArea: 5600,
        publicSpaceArea: 1500,
        interventionType: 'Restauración Patrimonial',
        startDate: '2024-07-15',
        endDate: '2026-03-20',
        status: 'Iniciado',
        description: 'Mantenimiento integral del sistema acústico, tramoya y restauración de la fachada de uno de los teatros más importantes del país.',
        lat: 5.0680,
        lng: -75.5080,
        images: {
            render: 'https://images.unsplash.com/photo-1503095396549-80705bc0607a?w=800&q=80',
            current: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
        },
        gantt: [
            { stage: 'Diagnóstico Estructural', estimatedStart: '2024-07-01', estimatedEnd: '2024-09-30', progress: 100 },
            { stage: 'Mantenimiento Acústico', estimatedStart: '2024-10-01', estimatedEnd: '2025-05-30', progress: 50 },
            { stage: 'Restauración Fachada', estimatedStart: '2025-06-01', estimatedEnd: '2025-12-31', progress: 0 },
            { stage: 'Pruebas Técnicas', estimatedStart: '2026-01-01', estimatedEnd: '2026-03-20', progress: 0 }
        ],
        stages: [
            { name: 'PLANEACIÓN (MGA)', progress: 100 },
            { name: 'ESTUDIOS PRELIMINARES', progress: 100 },
            { name: 'CONTRATACIÓN', progress: 100 },
            { name: 'INICIO', progress: 100 },
            { name: 'EJECUCIÓN', progress: 40 }
        ]
    }
];
