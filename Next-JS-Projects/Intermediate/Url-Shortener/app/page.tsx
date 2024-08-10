import MovingPart from '@/components/MovingPart'
import FixedPart from '@/components/FixedPart'

export default function Page() {
  return (
    <div className='flex w-full max-w-sm flex-col items-center space-y-5 rounded-xl bg-white bg-opacity-20 p-5'>
      <FixedPart />
      <MovingPart />
    </div>
  )
}
