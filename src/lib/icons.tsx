import {
  Grid3x3,
  Triangle,
  Droplet,
  Zap,
  Layers,
  LayoutGrid,
  PaintRoller,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import type { TradeId } from './types'

export const TRADE_ICONS: Record<TradeId, LucideIcon> = {
  maconnerie: Grid3x3,
  charpente: Triangle,
  plomberie: Droplet,
  electricite: Zap,
  platrerie: Layers,
  carrelage: LayoutGrid,
  peinture: PaintRoller,
  depannage: AlertTriangle,
}
