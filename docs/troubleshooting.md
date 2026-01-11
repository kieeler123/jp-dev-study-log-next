# Troubleshooting

## 500 Internal Server Error
- Checked Network tab: `/api/import` status 500
- Added server-side try/catch and logs
- Found MongoDB connection failure

## MongoDB SRV DNS: querySrv EBADNAME
- Root cause: SRV record could not be resolved (DNS / URI issues)
- Fix:
  - Validate `MONGODB_URI`
  - Restart dev server after `.env.local` update
  - Check network environment / DNS
