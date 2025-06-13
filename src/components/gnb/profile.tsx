
interface ProfileProps {
  profileImgUrl: string;
  onLogout: () => void;
}

export default function Profile({ profileImgUrl, onLogout }: ProfileProps) {
  return (
    <div style={styles.container}>
      <img src="/logo/logo-wh.svg" alt="logo" style={styles.logo} />
      <img
        src={profileImgUrl}
        alt="profile"
        onClick={onLogout}
        style={styles.profileImg}
      />
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
  profileImg: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
};
