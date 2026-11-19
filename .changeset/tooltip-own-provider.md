---
'@rax-ds/ui': patch
---

Tooltip and IconButton no longer need a `TooltipProvider` above them. Set `delayDuration` on the Tooltip, because a provider above it is ignored.
