import { getUser } from '@/store/actions/profile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Profile() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return <div>Profile</div>
}
