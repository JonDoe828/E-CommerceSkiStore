import { LoadingButton } from '@mui/lab';
import { Divider, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Product } from "../../app/models/products";

export default function ProductDetails() {
  const { basket } = useStoreContext()
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const [quantity, setQuantity] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const item = basket?.items.find(i => i.productId === product?.id)


  useEffect(() => {
    if (item) setQuantity(item.quantity)

    if (!id) return; // 如果 id 不存在，则退出
    // 定义异步函数
    const fetchProduct = async () => {
      setLoading(true); // 显式设置加载状态
      try {
        const response = await agent.Catalog.details(parseInt(id));
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false); // 确保加载状态被正确清理
      }
    };
    fetchProduct();
    // 可选：清理函数
    return () => {
      setProduct(null); // 在组件卸载时清除状态
    };
  }, [id, item]);

  if (loading) return <LoadingComponent message='Loading Product...' />
  if (!product) return <NotFound />
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 6 }}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant="h3" >{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>QuantityInStock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              variant='outlined'
              type='number'
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <LoadingButton
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth>
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}