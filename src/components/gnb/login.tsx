interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div style={styles.container}>
      <img src="/logo/logo-wh.svg" alt="logo" style={styles.logo} />
      <button onClick={onLogin} style={styles.loginButton}>
        로그인
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1140px',
    height: '70px',
    padding: '11px 60px',
    backgroundColor: '#101318',
    borderRadius: '16px',
  },
  logo: {
    height: '20px',
  },
  loginButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
  },
};
