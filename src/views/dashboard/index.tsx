import { GetArticleList, GetTableDataList } from '@/apis'
import Table from '@/components/Table'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { mspHeaders } from './constant'
import './index'
export default defineComponent({
  setup () {
    const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
      articleList: [],
      tableList: []
    })
    const router = useRouter()
    const headers = computed(() => mspHeaders<Service.ArticleItem>({
      handleClick: ({ row }) => {
        void router.push(`/order/detail?id=${row.id}`)
      }
    }))
    onMounted(async () => {
      const [r, d] = [await GetArticleList(), await GetTableDataList()]
      state.articleList = r.data.articleList
      state.tableList = d.data.tableList
    })
    return () => (
      <div>
        <SvgIcon {...{ name: 'test' }} />
        <Table data={state.articleList} headers={headers.value}></Table>
      </div>
    )
  }
})
