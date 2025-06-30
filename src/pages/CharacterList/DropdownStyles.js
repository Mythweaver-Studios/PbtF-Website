// Styling for custom tier filter dropdown

const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: 'var(--theme-bg-gradient)', // your custom background
            border: '0.125rem solid var(--theme-border-gold)',
            color: 'var(--theme-text-primary)',
            fontWeight: 600,
            fontSize: '1rem',
            width: '13rem',
            borderRadius: '0.5rem',
            padding: '0.25rem 1.25rem',
            cursor: 'pointer',
            boxShadow: state.isFocused ? '0 0 0.75rem rgba(255, 215, 0, 0.4)' : 'none',
            transition: 'all 0.2s ease',
            fontFamily: 'Georgia, serif',
            letterSpacing: '1px',

            '&:hover': {
                backgroundColor: "rgba(255, 215, 0, 0.2)",
                color: "var(--theme-text-primary)",
                boxShadow: "0 0 0.75rem rgba(255, 215, 0, 0.4)"
            },
        }),
        placeholder: (styles) => ({
            ...styles,
            color: "var(--theme-text-primary)",
        }),
        singleValue: (styles) => ({
            ...styles,
            color: "var(--theme-text-primary)",
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: "#1e1e1e",
            border: "1px solid var(--theme-border-gold)",
            borderRadius: '0.25rem',
            zIndex: 100,
        }),
        menuList: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
        }),
        option: (styles, { data, isFocused, isDisabled }) => ({
            ...styles,
            backgroundColor: isDisabled
                ? "#333"
                : isFocused
                ? data.bgcolor || "rgba(255, 215, 0, 0.2)" // fallback gold glow
                : "#1e1e1e",
            backgroundImage: isFocused && data.value === "Empyrean" ? data.bgcolor : "none",
            color: isDisabled ? "#888" : isFocused ? data.color : "var(--theme-text-primary)",
            cursor: isDisabled ? "cursor" : "pointer",
            fontFamily: "'Georgia', serif",
            letterSpacing: "1px",
            borderRadius: '0.125rem',
            padding: "0.5rem 1rem",
            transition: "background-color 0.2s ease",
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            color: 'var(--theme-text-primary)',
            padding: "0.5rem    ",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        input: (styles) => ({
            ...styles,
            color: 'var(--theme-text-primary)',
        }),
    };

export default customStyles;
