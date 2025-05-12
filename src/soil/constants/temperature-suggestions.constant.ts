export const TEMPERATURE_SUGGESTIONS = {
    FAVORABLE: {
        title: "Favorable",
        message: "La temperatura es adecuada para el cultivo. No se requiere acción.",
        videos: []
    },
    SLIGHTLY_UNFAVORABLE_UNDER: {
        title: "Levemente baja",
        message: "Temperatura ligeramente por debajo de lo adecuado. Se recomienda exponer los cultivos más al sol.",
        videos: []
    },
    SLIGHTLY_UNFAVORABLE_OVER: {
        title: "Levemente alta",
        message: "Temperatura ligeramente por encima de lo adecuado. Se recomienda agregar más sombra a los cultivos.",
        videos: []
    },
    UNFAVORABLE_UNDER: {
        title: "Baja",
        message: "Temperatura por debajo de lo adecuado. Se recomienda exponer los cultivos más al sol y verificar la frecuencia del regado.",
        videos: []
    },
    UNFAVORABLE_OVER: {
        title: "Alta",
        message: "Temperatura por encima de lo adecuado. Se recomienda agregar más sombra a los cultivos y aumentar ligeramente la frecuencia de regado.",
        videos: [
            {
                title: "Cómo instalar malla sombra para proteger tus cultivos y plantas",
                url: "https://youtu.be/3iXUS811zEs"
            },
            {
                title: "Cómo hacer un invernadero casero",
                url: "https://youtu.be/dQw4w9WgXcQ"
            },
            {
                title: "Uso de sombra para proteger del calor",
                url: "https://youtu.be/27mQQ1RhWDE"
            }
        ]
    },
    BURNING: {
        title: "Muy alta (riesgo de incendio)",
        message: "El suelo está en llamas. Mantenga la calma e intente apagar el fuego. Es posible que los cultivos se hayan perdido.",
        videos: []
    },
    FREEZING: {
        title: "Muy baja (riesgo de congelación)",
        message: "El suelo está muy por debajo de lo adecuado. Intente exponer los cultivos más al sol y regar con agua tibia para nivelar la temperatura.",
        videos: []
    }
};
