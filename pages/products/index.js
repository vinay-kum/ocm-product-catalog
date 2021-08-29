import { useEffect, useContext } from 'react'
import ProductsPage from '../../components/ProductsPage';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu'
import { CommonContext } from '../../providers/commonContexts'
import { getCategories, getSiteConfiguration, getProducts } from '../../services/service'

function Products({ getSiteConfig, categories, products }) {
  const { siteConfig, setSiteConfig, channelToken } = useContext(CommonContext)

  useEffect(() => {
    setSiteConfig(getSiteConfig)
  }, [getSiteConfig])

    return (
      <div>
        { siteConfig && siteConfig.id &&
          <>
            <HeaderMenu categories={categories} logoUrl={`${process.env.NEXT_PUBLIC_HOST_URL}/content/published/api/v1.1/assets/${siteConfig.fields.logo.id}/native/flowserve-logo.png?channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} />
          </>
        }
        <ProductsPage categories={categories} products={products} />
        { siteConfig && siteConfig.id &&
          <img style={{width: '100%'}} src={`${process.env.NEXT_PUBLIC_HOST_URL}/content/published/api/v1.1/assets/${siteConfig.fields.footer.id}/Large/footer.png?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`} alt="" />
        }
      </div>
    )
}

export async function getStaticProps() {
  const getSiteConfig = await getSiteConfiguration()
  const categories = await getCategories(getSiteConfig.fields.categories)
  const products = await getProducts()
  return {
    props: {
      getSiteConfig, categories, products
    }
  }
}

export default Products
