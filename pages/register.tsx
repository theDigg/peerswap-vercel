import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import Typography from '@mui/material/Typography';
import { VariantType, useSnackbar } from 'notistack';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert, { AlertColor } from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import { RedditTextField } from 'style/components/TextFields';
import {
  getAccountFromAlias,
  createAccount,
  registerAlias
} from 'api/peerswapAPI';
import { setWallets, setWallet } from 'features/wallet/walletSlice';
import { setAccount } from 'features/account/accountSlice';
import { _sleep } from 'utils/sleep';
import Page from 'components/Page';

const emoji_regex =
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [emoji, setEmoji] = useState('');
  const [status, setStatus] = useState(
    'Pick a username at least 4 characters long'
  );
  const [emojiStatus, setEmojiStatus] = useState(
    'You can only pick one emoji, but you can always change it later :)'
  );
  const [found, setFound] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [emojiSeverity, setEmojiSeverity] = useState<AlertColor>('info');
  const [loading, setLoading] = useState(false);
  const { wallets } = useSelector((state: RootState) => state.wallet);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, response: string) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(response, { variant });
  };

  useEffect(() => {
    if (wallets.some((wallet: any) => wallet.handle === username)) {
      setStatus('This wallet was found in your local storage!');
      setSeverity('success');
      setFound(true);
    } else if (username.length > 3) {
      setFound(false);
      // fetch(`/api/user/${username}`)
      //   .then((res) => res.json())
      //   .then(({ data }) => {
      //     if (data.error) {
      //       setStatus('This username is available!');
      //       setSeverity('success');
      //     } else {
      //       setStatus('This username is already taken');
      //       setSeverity('error');
      //     }
      //   });
      getAccountFromAlias(username).then((res) => {
        if (res.error) {
          setStatus('This username is available!');
          setSeverity('success');
        } else {
          setStatus('This username is already taken');
          setSeverity('error');
        }
      });
    } else {
      setFound(false);
      setStatus('Pick a username at least 4 characters long');
      setSeverity('info');
    }
    if (emoji.length === 2) {
      if (emoji_regex.test(emoji) !== true) {
        setEmojiStatus('Emoji must be a valid emoji');
        setEmojiSeverity('error');
      } else {
        setEmojiStatus('Great choice 😎');
        setEmojiSeverity('success');
      }
    }
    if (emoji.length > 2) {
      setEmojiStatus(
        'You can only pick one emoji, but you can always change it later :)'
      );
      setEmojiSeverity('error');
    }
  }, [username, emoji, wallets]);

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexWrap: 'wrap', mt: 10 }}>
      <Paper elevation={3} sx={{ flexGrow: 1, p: 3, justifyContent: 'center' }}>
        <Typography variant="h2" align="center">
          Register
        </Typography>
        <FormGroup sx={{ p: 5 }}>
          <Alert variant="filled" severity={severity} sx={{ mb: 2 }}>
            {status}
          </Alert>
          <Alert variant="filled" severity={emojiSeverity} sx={{ mb: 2 }}>
            {emojiStatus}
          </Alert>
          <RedditTextField
            sx={{ mb: 2 }}
            label="Username"
            variant="filled"
            id="username-input"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
          <RedditTextField
            sx={{ mb: 2 }}
            label="Emoji"
            variant="filled"
            id="emoji-input"
            onChange={(e) => setEmoji(e.target.value)}
          />
          {found ? (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={severity !== 'success'}
              onClick={() => {
                dispatch(
                  setWallet(
                    wallets.filter(
                      (wallet: any) => wallet.handle === username
                    )[0]
                  )
                );
                router.push('/dashboard');
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={
                loading || severity !== 'success' || emojiSeverity !== 'success'
              }
              onClick={async () => {
                let wallet = await createAccount(username);
                registerAlias(username, emoji, wallet).then(
                  ({ result }: any) => {
                    handleClickVariant(result.status, result.reason)();
                  }
                );
                setLoading(true);
                while ((await getAccountFromAlias(username)).error) {
                  await _sleep(500);
                }
                setLoading(false);
                dispatch(setWallets(wallet));
                const { account } = await getAccountFromAlias(username);
                dispatch(setAccount(account));
                router.push('/dashboard');
              }}
            >
              Register
            </Button>
          )}
          {loading && (
            <LinearProgress sx={{ width: '100%', mt: 4 }} color="secondary" />
          )}
        </FormGroup>
      </Paper>
    </Container>
  );
};

const RegisterPage = () => (
  <Page name="Register" path="/register">
    <Register />
  </Page>
);

export default RegisterPage;
