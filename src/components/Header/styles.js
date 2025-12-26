export const styles = {
  title: {
    display: { xs: 'none', sm: 'block' },
  },
  search: {
    position: 'relative',
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
    marginRight: 2,
    marginLeft: 0,
    width: '100%',
    sx: { sm: { marginLeft: 3, width: 'auto' } },
  },
  searchIcon: {
    padding: '0 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: '8px 8px 8px 0',
    paddingLeft: 'calc(1em + 32px)',
    transition: 'width 0.3s',
    width: '100%',
    md: { width: '20ch' },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};